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
  console.log(data);
  return data.jobs;
};

