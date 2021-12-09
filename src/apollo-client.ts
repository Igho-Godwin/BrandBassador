import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://assignment-fa.brandbassador.com/graphql",
  cache: new InMemoryCache(),
});

export default client;
