export const emailContent = (code: string, path: string, firstName: string) => {
  return path === "/emailActivation"
    ? `<h2>Verify your Email address</h2>  
<p>HI <b>${firstName}</b>, Thanks for starting the new Freelance Wave account creation process. We want to make sure it's really you. Please enter 
the following <b> verification code: </b> <b>${code}</b>.<br>If you don't want to create an account, you can ignore this message.
</p>`
    : `<h2>Password Reset</h2> <p>Hi <b>${firstName}</b>, If you've lost your password or wish to reset it, use this <b>code:
</b>  <b>${code}</b>. If you did not request a password reset, you can safely ignore this email. Only a person with access 
to your email can reset your account password. </p>`;
};
