import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyToken } from "../services/userService";
import useDecodedToken from "../hooks/useDecodedToken";

const ActivateRedirect = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const calledOnce = useRef(false);
  const decodedToken = useDecodedToken();
  const verified = decodedToken?.verified;
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
        navigate("/");
      } catch (error) {
        console.error("Activation failed", error);
        navigate("/not-found");
      }
    };

    activate();
  }, [token, navigate, verified]);

  return null;
};

export default ActivateRedirect;
