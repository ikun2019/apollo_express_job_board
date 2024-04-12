import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient('http://localhost:9000/graphql');

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
        }
      }
    }
  `;
  const data = await client.request(query, { jobId: id });
  console.log("getJob function =>", data);
  return data.job;
};
