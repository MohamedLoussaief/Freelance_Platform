import { jwtDecode } from "jwt-decode";
import { useAuthContext } from "../context/AuthContext";

interface DecodedToken {
  _id: number;
  userType: string;
}

const useDecodedToken = () => {
  const { user } = useAuthContext();

  const token = (user as { token: string })?.token;

  if (token) {
    try {
      const decodedToken = jwtDecode(token) as DecodedToken;
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
