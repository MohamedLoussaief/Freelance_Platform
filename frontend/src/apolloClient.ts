import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { getAuthToken } from "./utils/authToken";

const graphUrl = import.meta.env.VITE_GRAPHQL;

const authLink = new SetContextLink((prevContext) => {
  const token = getAuthToken();
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = new HttpLink({
  uri: graphUrl,
  credentials: "include",
});

export const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});
