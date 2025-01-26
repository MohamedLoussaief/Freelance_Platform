import { createContext, useContext } from "react";
import useUserData from "../hooks/useUserData";

interface UserContextType {
  userData: any;
  loading: boolean;
  errorData: string | null;
  fetchUserData: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { userData, loading, errorData, fetchUserData } = useUserData();

  return (
    <UserContext.Provider
      value={{ userData, loading, errorData, fetchUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
