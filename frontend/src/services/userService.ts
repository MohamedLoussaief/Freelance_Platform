import axios from "axios";
import { User } from "../types/models/User";
import { baseURL, get } from "../api/client";

const signup = async (userData: User) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/auth/signup`,
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
      `${baseURL}/api/auth/login`,
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

const emailSend = async (email: string, type: string) => {
  try {
    await axios.post(`${baseURL}/api/auth/email-link`, {
      email,
      type,
    });
  } catch (error: any) {
    throw error;
  }
};

const verifyToken = async (type: string, token: string) => {
  try {
    const response = await get(
      `${baseURL}/api/auth/verify-token/${type}/${token}`
    );
    return response.msg;
  } catch (error: any) {
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

const logout = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/auth/logout`, {
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
