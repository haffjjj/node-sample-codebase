import types from "./types"
import logger from "../../../../../utils/logger"

class stackGqlHandler{
  constructor(stackUsecase){
    this.stackUsecase = stackUsecase
  }

  resolvers(){
    const stackUsecase = this.stackUsecase
    return {
      Query: {
        async getStacks (_, {search, filter}) {
          try{
            const filterStack = {
              title: search.title,
            }
            const sort = filter.sort
            const skip = filter.skip
            const limit = filter.limit

            const stackGroup = await stackUsecase.fetch(filterStack, sort, skip, limit)

            return stackGroup
          }
          catch(e){
            logger("error", "stack-gql-getStacks", e.message, e)
            return e
          }
        }
      },
      Mutation: {
        async createStack(_, {input}) {
          try{
            const body = {
              title: input.title
            }
            const result = await stackUsecase.store(body)
  
            return {
              id: result
            }
          }
          catch(e){
            logger("error", "stack-gql-createStack", e.message, e)
            return e
          }
        },
        async updateStack(_, {stackId, input}){
          try{
            const id = stackId
            const body = {
              title: input.title
            }
            const result = await stackUsecase.update(id, body)

            return {
              id: result
            }
          }
          catch(e){
            logger("error", "stack-gql-updateStack", e.message, e)
            return e
          }
        },
        async deleteStack(_, {stackId}){
          try{
            const id = stackId
            const result = await stackUsecase.delete(id)

            return {
              id: result
            }
          }
          catch(e){
            logger("error", "stack-gql-deleteStack", e.message, e)
            return e
          }
        }
      }
    }
  }

  typeDefs(){
    return types
  }

} 

export default stackGqlHandler