import axios, { AxiosRequestConfig } from "axios";
import { fetchToken } from "./token";

export const baseURL = import.meta.env.VITE_NODE_SERVER_HOST;

const Client = axios.create({
  baseURL,
});

const config = async (): Promise<AxiosRequestConfig> => {
  const token = await fetchToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const post = async (url: string, data: any): Promise<any> => {
  try {
    const response = await Client.post(url, data, await config());
    return response.data;
  } catch (err: any) {
    console.error({ err });
    throw err.response?.data || err;
  }
};

export const get = async (url: string): Promise<any> => {
  try {
    const response = await Client.get(url, await config());
    return response.data;
  } catch (err: any) {
    console.error({ err });
    throw err.response?.data || err;
  }
};

export const patch = async (url: string, data: any): Promise<any> => {
  try {
    const response = await Client.patch(url, data, await config());
    return response.data;
  } catch (err: any) {
    console.error({ err });
    throw err.response?.data || err;
  }
};

export const update = async (url: string, data: any): Promise<any> => {
  try {
    const response = await Client.put(url, data, await config());
    return response.data;
  } catch (err: any) {
    console.error({ err });
    throw err.response?.data || err;
  }
};

export const remove = async (url: string): Promise<any> => {
  try {
    const response = await Client.delete(url, await config());
    return response.data;
  } catch (err: any) {
    console.error({ err });
    throw err.response?.data || err;
  }
};
