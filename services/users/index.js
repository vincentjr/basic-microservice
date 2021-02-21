const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const jwt = require("jsonwebtoken");

const users = [
  {id: 1, username: "foo", email: "foo@test.com", password: "foo"},
  {id: 2, username: "bar", email: "bar@test.com", password: "bar"},
  {id: 3, username: "beef", email: "beef@test.com", password: "beef"},
  {id: 4, username: "stew", email: "stew@test.com", password: "stew"},
]

const typeDefs = gql`
  extend type Query {
    me: User
    searchUser(id: ID!): User
  }
  extend type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    authenticate(username: String!, password: String!): AuthToken!
  }
  type User @key(fields: "id") {
      id: ID!
      username: String!
      email: String!
      password: String!
  }
  type AuthToken {
      token: String!
  }
`;

const resolvers = {
  Product: {
      __resolveReference: user => users.find(u => u.id === user.id)
  },
  Query: {
      me: (_, _args, {user}) => user
  },
  Mutation: {
      createUser: (_, args) => {
          users.push(args);
          return args;
      },
      authenticate: (_, {username, password}) => {
          let _user = null;
          _user = users.find(u => u.username === username && u.password === password);
          if(!_user)
              throw new Error("The user does not exist");
          const token = jwt.sign({id: _user.id}, "secret");
          return {token}
      }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ]),
  context: ({req}) => {
      const user = req.headers.user;
      if(user) {
          return { user: JSON.parse(user) };
      }
  }
});

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
