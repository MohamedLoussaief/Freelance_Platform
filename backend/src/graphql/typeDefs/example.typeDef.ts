import { gql } from "apollo-server-express";

export const exampleTypeDefs = gql`
  type Query {
    hello: String
  }
`;
