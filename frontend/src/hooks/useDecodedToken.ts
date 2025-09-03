import { jwtDecode } from "jwt-decode";
import { useAuthContext } from "../context/AuthContext";

interface DecodedToken {
  id: number;
  userType: string;
  email: string;
  verified: boolean;
}

const useDecodedToken = () => {
  const { user } = useAuthContext();

  const token = (user as { token: string })?.token;

  if (token) {
    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  } else {
    return null;
  }
};

export default useDecodedToken;
