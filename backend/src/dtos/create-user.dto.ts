import {
  IsNotEmpty,
  Matches,
  IsEmail,
  Length,
  IsOptional,
} from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: "First name is required" })
  @Matches(/^[A-Za-z]+$/, { message: "First name must contain only letters" })
  firstName!: string;

  @IsNotEmpty({ message: "Last name is required" })
  @Matches(/^[A-Za-z]+$/, { message: "Last name must contain only letters" })
  lastName!: string;

  @IsEmail({}, { message: "Invalid email format" })
  email!: string;

  @IsNotEmpty()
  userType!: string;

  @IsNotEmpty({ message: "Please select your country" })
  country!: string;

  @IsOptional()
  companyName?: string;

  @IsOptional()
  picture?: string;

  @IsNotEmpty({ message: "Password is required" })
  @Length(8, 32, {
    message: "Password must be between 8 and 32 characters",
  })
  @Matches(/(?=.*[a-z])/, {
    message: "Password must contain at least one lowercase letter",
  })
  @Matches(/(?=.*[A-Z])/, {
    message: "Password must contain at least one uppercase letter",
  })
  @Matches(/(?=.*\d)/, {
    message: "Password must contain at least one number",
  })
  @Matches(/(?=.*[@$!%*?&])/, {
    message: "Password must contain at least one special character (@$!%*?&)",
  })
  password!: string;
}
