const { GraphQLServer } = require('graphql-yoga')

const BellState = require('./BellState')

const bellState = new BellState('./data/bellsData.json')

const resolvers = {
  Query: {
    serverTime: () => Date.now(),
    bells: () => bellState.bells
  },
  Mutation: {
    createBell: (_, {name}) => bellState.createBell(name),
    doteEvent: (_, {bellName, type}) => bellState.doteEvent(bellName, type),
  }
}

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers
})

server.start(() => console.log('Server is running on http://localhost:4000'))
