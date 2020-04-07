"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var apollo_server_express_1 = require("apollo-server-express");
// Construct a schema, using GraphQL schema language
var typeDefs = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Query {\n    hello: String\n  }\n"], ["\n  type Query {\n    hello: String\n  }\n"
    // Provide resolver functions for your schema fields
])));
// Provide resolver functions for your schema fields
var resolvers = {
    Query: {
        hello: function () { return 'Hello world!'; },
    },
};
var server = new apollo_server_express_1.ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
var app = express_1.default();
server.applyMiddleware({ app: app });
app.listen({ port: 4000 }, function () {
    return console.log("\uD83D\uDE80 Server ready at http://localhost:4000" + server.graphqlPath);
});
var templateObject_1;
