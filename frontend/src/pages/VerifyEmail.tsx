import { useState } from "react";
import mail from "../assets/images/mail.png";
import useDecodedToken from "../hooks/useDecodedToken";
import { emailSend } from "../services/userService";
import { CircularProgress } from "@mui/material";
import NavBar from "../components/organisms/NavBar";

const VerifyEmail: React.FC = () => {
  const decodedToken = useDecodedToken();
  const email = decodedToken?.email;
  const [resendStatus, setResendStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleResend = async () => {
    setIsLoading(true);
    setResendStatus({ type: null, message: "" });
    try {
      await emailSend(email as string, "verify");
      setResendStatus({ type: "success", message: "Email sent successfully!" });
    } catch (error: any) {
      //console.error("Email sending failed:", error);
      setResendStatus({
        type: "error",
        message: "Failed to send email. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center p-3">
          <img
            src={mail}
            alt=""
            width="150px"
            height="150px"
            className="mb-2"
          />
          <h1 className="text-2xl font-medium  md:text-3xl mb-4 text-center">
            Verify your email continue
          </h1>
          <p className="text-center">
            We just sent an email to the adress :
            <span className="font-medium"> {email}</span>
          </p>
          <p className="mb-2 text-center">
            Please check your email and select the link provided to verify your
            adress
          </p>
          <p
            className={
              resendStatus.type === "success"
                ? "text-green-600"
                : "text-red-600"
            }
          >
            {" "}
            {resendStatus.message}{" "}
          </p>

          {isLoading ? (
            <CircularProgress
              className="mt-2"
              size={45}
              sx={{ color: "blue" }}
            />
          ) : (
            <button
              type="button"
              className="bg-[#108a01] mt-2 text-white px-3  py-3 rounded-md"
              onClick={handleResend}
            >
              Send again
            </button>
          )}
        </div>{" "}
      </div>
    </>
  );
};

export default VerifyEmail;
