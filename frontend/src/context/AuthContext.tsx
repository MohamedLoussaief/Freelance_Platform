import {
  createContext,
  useReducer,
  Dispatch,
  useEffect,
  useContext,
} from "react";
import { useRefreshToken } from "../hooks/useRefreshToken";
import { setAuthToken } from "../utils/authToken";

interface AuthState {
  user: null | object | undefined;
  loading: boolean;
}

interface AuthAction {
  type: string;
  payload?: { token: string | null };
}

interface AuthContextType extends AuthState {
  dispatch: Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  dispatch: () => {},
});

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      if (action.payload?.token) {
        setAuthToken(action.payload.token);
      }
      return {
        user: action.payload?.token ? { token: action.payload.token } : null,
        loading: false,
      };
    case "LOGOUT":
      setAuthToken("");
      return { user: null, loading: false };
    default:
      return state;
  }
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    loading: true,
  });
  const { refreshToken } = useRefreshToken();

  useEffect(() => {
    const auth = async () => {
      try {
        // Attempt to refresh the token at initial render
        const refreshedToken = await refreshToken();

        if (refreshedToken) {
          dispatch({ type: "LOGIN", payload: { token: refreshedToken } });
        } else {
          dispatch({ type: "LOGOUT" });
        }
      } catch (error) {
        console.error("Authentication error:", error);
        dispatch({ type: "LOGOUT" });
      }
    };

    auth();

    // Set up interval to refresh token every 15 minutes
    const refreshInterval = setInterval(async () => {
      const refreshedToken = await refreshToken();
      if (refreshedToken) {
        dispatch({ type: "LOGIN", payload: { token: refreshedToken } });
      }
    }, 15 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  return context;
};
