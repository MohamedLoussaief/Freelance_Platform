import { fetchToken } from "../api/token";

export const useRefreshToken = () => {
  const refreshToken = async (): Promise<string | null> => {
    try {
      const response = await fetchToken();
      return response || null;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      return null;
    }
  };

  return { refreshToken };
};
