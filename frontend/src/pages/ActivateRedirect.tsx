import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyToken } from "../api/userService";
import useDecodedToken from "../hooks/useDecodedToken";
import { useRefreshToken } from "../hooks/useRefreshToken";
import { useAuthContext } from "../context/AuthContext";

const ActivateRedirect = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const calledOnce = useRef(false);
  const decodedToken = useDecodedToken();
  const verified = decodedToken?.verified;
  const { refreshToken } = useRefreshToken();
  const { dispatch } = useAuthContext();

  useEffect(() => {
    if (verified) {
      navigate("/");
      return;
    }

    if (!token || calledOnce.current) return;
    calledOnce.current = true;

    const activate = async () => {
      try {
        await verifyToken("verify", token);
        const jwt = await refreshToken();
        if (jwt) {
          dispatch({ type: "LOGIN", payload: { token: jwt } });
        }
        navigate("/");
      } catch (error) {
        //console.error("Activation failed", error);
        navigate("/not-found");
      }
    };

    activate();
  }, [token, navigate, verified]);

  return null;
};

export default ActivateRedirect;
