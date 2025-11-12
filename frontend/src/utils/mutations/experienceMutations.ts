import { gql } from "@apollo/client";

export const ADD_FREELANCER_EXPERIENCE = gql`
  mutation Experience($experienceInput: ExperienceInput!) {
    experience(experienceInput: $experienceInput)
  }
`;

export const DELETE_FREELANCER_EXPERIENCE = gql`
  mutation DeleteFreelancerExperience($experienceId: String!) {
    deleteFreelancerExperience(experienceId: $experienceId)
  }
`;
