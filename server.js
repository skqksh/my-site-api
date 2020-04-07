const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');
admin.initializeApp();
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type Hotdog {
    isKosher: Boolean
    location: String
    name: String
    style: String
    website: String
  }

  type Query {
    hotdogs: [Hotdog]
    greeting: String
    version: String
  }
`;

const resolvers = {
  Query: {
    hotdogs: () =>
      admin
        .database()
        .ref('hotdogs')
        .once('value')
        .then((snap) => snap.val())
        .then((val) => Object.keys(val).map((key) => val[key])),
    greeting: () => 'Hello GraphQL  From TutorialsPoint !!',
    version: () => '1',
  },
};

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/', cors: true });
exports.graphql = functions.https.onRequest(app);
