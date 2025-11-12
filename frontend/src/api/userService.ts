import axios from "axios";
import { User } from "../types/models/User";

const baseURL = import.meta.env.VITE_NODE_SERVER_HOST;

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

const login = async (data: any) => {
  try {
    const response = await axios.post(
      `${baseURL}/auth/login`,
      { ...data },
      {
        withCredentials: true, // Allow cookies to be sent
      }
    );

    if (response.status === 200) {
      return response.data.token;
    }
  } catch (error: any) {
    throw error;
  }
};

const emailSend = async (email: string, type: string, token: string) => {
  try {
    await axios.post(
      `${baseURL}/auth/email-link`,
      {
        email,
        type,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error: any) {
    throw error;
  }
};

const verifyToken = async (type: string, token: string) => {
  try {
    const response = await axios.get(
      `${baseURL}/auth/verify-token/${type}/${token}`
    );
    return response.data.msg;
  } catch (error: any) {
    throw error;
  }
};

const getUserData = async () => {
  try {
    const response = await axios.get("/profile/user-data");

    return response.data.user;
  } catch (error: any) {
    throw error;
  }
};

const logout = async () => {
  try {
    const response = await axios.get(`${baseURL}/auth/logout`, {
      withCredentials: true,
    });
    if (response) {
      return true;
    }
  } catch (error: any) {
    throw error;
  }
};

export { signup, getUserData, logout, login, emailSend, verifyToken };
