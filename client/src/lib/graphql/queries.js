// import { GraphQLClient, gql } from 'graphql-request';
import { ApolloClient, createHttpLink, ApolloLink, concat, gql, InMemoryCache } from '@apollo/client';
import { getAccessToken } from '../auth';

// const client = new GraphQLClient('http://localhost:9000/graphql', {
//   headers: () => {
//     const accessToken = getAccessToken();
//     if (accessToken) {
//       return { 'Authorization': `Bearer ${accessToken}` };
//     };
//     return {};
//   }
// });

const httpLink = createHttpLink({
  uri: 'http://localhost:9000/graphql',
});

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext({
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
  };
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
    },
    watchQuery: {
      fetchPolicy: 'network-only',
    },
  },
});

export const getJobsQuery = gql`
  query($limit: Int!, $offset: Int!) {
    jobs(limit: $limit, offset: $offset) {
      items {
        id
        date
        title
        description
        company {
          id
          name
          description
        }
      },
      totalCount
    }
  }
`;

export async function getJobs() {
  const query = gql`
    query {
      jobs{
        id,
        date,
        title,
        description,
        company {
          id
          name
          description
        }
      }
    } 
  `;
  const result = await apolloClient.query({ query });
  console.log("getJobs function =>", result);
  return result.data.jobs;
};

export const getJobQuery = gql`
  query($jobId: ID!) {
    job(id: $jobId) {
      id
      date
      title
      description
      company {
        id
        name
      }
    }
  }
`;

export async function getJob(id) {
  const query = gql`
    query($jobId: ID!) {
      job(id: $jobId) {
        id
        date
        title
        description
        company {
          id
          name
        }
      }
    }
  `;
  const result = await apolloClient.query({ query, variables: { jobId: id } });
  console.log("getJob function =>", result);
  return result.data.job;
};

export const companyByIdQuery = gql`
  query($companyId: ID!) {
    company(id: $companyId) {
      id
      name
      description
      jobs {
        id
        date
        title
      }
    }
  }
`;

const jobDatailFragment = gql`
fragment JobDetail on Job {
  id
  date
  title
  description
  company {
    id
    name
  }
}`;

export const jobByIdQuery = gql`
  query($jobId: ID!) {
      job(id: $jobId) {
        ...JobDetail
      }
    }
    ${jobDatailFragment}
`;

export const createJobMutation = gql`
  mutation($input: createJobInput!){
    createJob(input: $input) {
      ...JobDetail
    }
  }
  ${jobByIdQuery}
`;

export async function createJob({ title, description }) {
  const mutation = gql`
    mutation($input: createJobInput!){
      createJob(input: $input) {
        ...JobDetail
      }
    }
    ${jobDatailFragment}
  `;
  const result = await apolloClient.mutate({
    mutation,
    variables: {
      input: { title, description }
    },
    update: (cache, result) => {
      cache.writeQuery({
        query: jobByIdQuery,
        variables: { id: result.data.job.id },
        data: result.data,
      })
    },
  });
  return result.data.createJob;
};