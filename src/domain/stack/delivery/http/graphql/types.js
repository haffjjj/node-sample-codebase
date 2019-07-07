import { gql } from "apollo-server-express"

const typeDefs = gql`
input StackInput {
   title: String!
 }

 input StackSearch {
   title: String
 }

 type Stack {
   id: String
   title: String
   state: String
 }

 input StackFilter {
  sort: String
  skip: Int
  limit: Int
}

type getStacksOutput{
  data: [Stack]
  count: Int
}

 type Query {
   getStacks(search: StackSearch, filter: StackFilter): getStacksOutput
 }

 type Mutation {
   createStack(input: StackInput): Stack
   updateStack(stackId: String! input: StackInput): Stack
   deleteStack(stackId: String!): Stack
 }
`

export default typeDefs