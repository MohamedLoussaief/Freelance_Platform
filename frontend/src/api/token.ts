import axios from "axios";

const baseURL = import.meta.env.VITE_NODE_SERVER_HOST;

export const fetchToken = async (): Promise<string | undefined> => {
  try {
    const response = await axios.get(`${baseURL}/auth/refresh`, {
      withCredentials: true, // Allow cookies to be sent
    });
    return response.data.token;
  } catch (err: any) {
    //console.error("Error fetching access token", err);
    throw err.response?.data || err;
  }
};
