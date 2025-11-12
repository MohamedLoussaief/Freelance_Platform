import { gql } from "@apollo/client";

export const ADD_USER_CATEGORIES = gql`
  mutation Services($servicesInput: [SubcategoryInput!]!) {
    service(servicesInput: $servicesInput)
  }
`;
