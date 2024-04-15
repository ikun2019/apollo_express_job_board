import { GraphQLError } from 'graphql';

export function notFoundError(message) {
  return new GraphQLError(message, {
    extensions: { code: 'NOT_FOUND' }
  });
};

export function unAuthorizeError(message) {
  return new GraphQLError(message, {
    extensions: { code: 'UNAUTHORIZE' }
  });
};