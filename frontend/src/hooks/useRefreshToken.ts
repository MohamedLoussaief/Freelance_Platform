import { useState } from "react";
import { fetchToken } from "../api/token";

export const useRefreshToken = () => {
  const [token, setToken] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshToken = async () => {
    const response = await fetchToken();
    setToken(response);
    setIsLoading(false);
  };

  return { token, isLoading, refreshToken };
};
