import { gql } from "@apollo/client";

export const GET_FREELANCER_SERVICES = gql`
  query GetFreelancerServices {
    freelancer {
      subcategories {
        id
      }
    }
  }
`;

export const GET_FREELANCER_SKILLS = gql`
  query GetFreelancerSkills {
    freelancer {
      skills {
        id
        name
      }
    }
  }
`;

export const GET_FREELANCER_JOBTITLE = gql`
  query GetFreelancerJobTitle {
    freelancer {
      jobTitle
    }
  }
`;

export const GET_FREELANCER_EXPERIENCE = gql`
  query GetFreelancerExperience {
    freelancer {
      experienceList {
        id
        jobTitle
        company
        currentlyWorking
        startDate
        endDate
        description
      }
    }
  }
`;
