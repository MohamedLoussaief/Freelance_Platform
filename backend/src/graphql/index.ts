import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { exampleTypeDefs } from "./typeDefs/example.typeDef";
import { exampleResolvers } from "./resolvers/example.resolver";

export const typeDefs = mergeTypeDefs([exampleTypeDefs]);
export const resolvers = mergeResolvers([exampleResolvers]);
