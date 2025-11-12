import { useState, useEffect } from "react";
import { getUserData } from "../api/userService";

const useUserData = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorData, setErrorData] = useState<string | null>(null);

  const fetchUserData = async () => {
    try {
      const data = await getUserData();
      setUserData(data);
      setLoading(false);
    } catch (err: any) {
      setErrorData("Failed to load user data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return { userData, loading, fetchUserData, errorData };
};

export default useUserData;
