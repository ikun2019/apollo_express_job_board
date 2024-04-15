import cors from 'cors';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import fs from 'fs';
import path from 'path';
import { expressMiddleware } from '@apollo/server/express4';
import { authMiddleware, handleLogin } from './auth.js';


const PORT = 9000;

// * Express Serverの設定
const app = express();
app.use(cors(), express.json(), authMiddleware);

app.post('/login', handleLogin);

// * typeDefs, resolversの設定
import { Query } from './resolvers/Query.js';
import { Job } from './resolvers/Job.js';
import { Company } from './resolvers/Company.js';
import { Mutation } from './resolvers/Mutation.js';
import { getUser } from './db/users.js';
const typeDefs = fs.readFileSync(path.join(process.cwd(), "./schema.graphql"), 'utf-8');
const resolvers = {
  Query,
  Job,
  Company,
  Mutation,
};
// * Apollo Serverの設定
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

async function getContext({ req }) {
  if (req.auth) {
    const user = await getUser(req.auth.sub);
    return { user };
  };
  return {};
};

(async () => {
  await apolloServer.start();
  app.use('/graphql', expressMiddleware(apolloServer, {
    context: getContext,
  }));
  app.listen({ port: PORT }, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('GraphQL is running');
  });
})();
