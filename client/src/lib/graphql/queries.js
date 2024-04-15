import { GraphQLClient, gql } from 'graphql-request';
import { getAccessToken } from '../auth';

const client = new GraphQLClient('http://localhost:9000/graphql', {
  headers: () => {
    const accessToken = getAccessToken();
    if (accessToken) {
      return { 'Authorization': `Bearer ${accessToken}` };
    };
    return {};
  }
});

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
  const data = await client.request(query);
  console.log("getJobs function =>", data);
  return data.jobs;
};

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
  const data = await client.request(query, { jobId: id });
  console.log("getJob function =>", data);
  return data.job;
};

export async function getCompany(id) {
  const query = gql`
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
  const data = await client.request(query, { companyId: id });
  return data.company;
};

export async function createJob({ title, description }) {
  const mutation = gql`
    mutation($input: createJobInput!){
      createJob(input: $input) {
        id
        title
        description
        date
      }
    }
  `;
  const data = await client.request(mutation, {
    input: { title, description }
  });
  return data.createJob;
};