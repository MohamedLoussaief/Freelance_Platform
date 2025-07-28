import dotenv from "dotenv";
dotenv.config();
export const emailContent = (
  token: string,
  type: string,
  firstName: string
) => {
  return type === "verify"
    ? `<h2>Verify your Email address</h2>  
<p>HI <b>${firstName}</b>, Thanks for starting the new Freelance Wave account creation process. We want to make sure it's really you. 
Click the link below to continue:
${process.env.CLIENT}/activate-account/${token}
<br>If you don't want to create an account, you can ignore this message.
</p>`
    : `<h2>Password Reset</h2> <p>Hi <b>${firstName}</b>, If you've lost your password or wish to reset it, Click the link below to continue:
${process.env.CLIENT}/forget-password/${token}
If you did not request a password reset, you can safely ignore this email. Only a person with access 
to your email can reset your account password. </p>`;
};
