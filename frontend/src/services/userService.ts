import axios from "axios";
import { User } from "../types/models/User";
import { baseURL, get, update } from "../api/client";

const signup = async (userData: User) => {
  try {
    const response = await axios.post(
      `${baseURL}/auth/signup`,
      {
        ...userData,
      },
      {
        withCredentials: true, // Allow cookies to be sent
      }
    );
    return response.data.token;
  } catch (error: any) {
    //console.error("Error creating user:", error);
    throw error;
  }
};

const getUserData = async () => {
  try {
    const response = await get("/profile/user-data");

    return response.user;
  } catch (error: any) {
    throw error;
  }
};

const fieldOfWork = async (service: string) => {
  try {
    const response = await update("/profile/work-field", { service });

    return response;
  } catch (error: any) {
    throw error;
  }
};

export { signup, fieldOfWork, getUserData };
