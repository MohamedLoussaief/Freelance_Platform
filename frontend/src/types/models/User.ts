export enum UserType {
  Client = "Client",
  Freelance = "Freelancer",
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  companyName?: string;
  password: string;
  country: string;
  userType: string;
}

export interface IExperience {
  _id: string;
  jobTitle: string;
  company: string;
  currentlyWorking: boolean;
  startDate: string;
  endDate: string;
  description: string;
}
