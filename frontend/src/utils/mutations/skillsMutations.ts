import { gql } from "@apollo/client";

export const ADD_FREELANCER_SKILL = gql`
  mutation Skills($skillsInput: [SkillInput!]!) {
    skills(skillsInput: $skillsInput)
  }
`;

export const DELETE_FREELANCER_SKILL = gql`
  mutation DeleteFreelancerSkill($skillName: String!) {
    deleteFreelancerSkill(skillName: $skillName)
  }
`;
