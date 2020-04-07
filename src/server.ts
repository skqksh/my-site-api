import admin from 'firebase-admin'
admin.initializeApp()
import { https } from 'firebase-functions'
import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'

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
`

const resolvers = {
  Query: {
    hotdogs: (): Promise<any> =>
      admin
        .database()
        .ref('hotdogs')
        .once('value')
        .then((snap) => snap.val())
        .then((val) => Object.keys(val).map((key) => val[key])),
    greeting: (): string => 'Hello GraphQL  From TutorialsPoint !!',
    version: (): string => '2',
  },
}

const app = express()
const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app, path: '/', cors: true })
exports.graphql = https.onRequest(app)
