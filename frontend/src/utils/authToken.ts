let authToken = "";

export const setAuthToken = (token: string) => {
  authToken = token;
};

export const getAuthToken = () => authToken;
