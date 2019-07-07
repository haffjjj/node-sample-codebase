import { ApolloServer } from "apollo-server-express"
import { merge } from "lodash";

export default (...handlers) => {  
  const typeDefs = []
  const resolvers = []
  
  handlers.map((handle) => {
    typeDefs.push(handle.typeDefs())
    resolvers.push(handle.resolvers())
  })

  return new ApolloServer({
    typeDefs: typeDefs,
    resolvers: merge(resolvers),
    // tracing: true
  })
}