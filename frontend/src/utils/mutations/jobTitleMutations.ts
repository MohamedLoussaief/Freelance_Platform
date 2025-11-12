import { gql } from "@apollo/client";

export const ADD_FREELANCER_JOBTITLE = gql`
  mutation updateJobTitle($jobTitleInput: JobTitleInput!) {
    jobTitle(jobTitleInput: $jobTitleInput)
  }
`;
