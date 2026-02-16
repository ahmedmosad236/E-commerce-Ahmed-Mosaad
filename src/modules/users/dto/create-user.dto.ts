import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString, MaxLength, MinLength } from "class-validator";
import { Role } from "../entities/user.entity";
import { Optional } from "@nestjs/common";

export class CreateUserDto {
  @ApiProperty({
    description: "The user's full name (first and last name or display name)",
    example: "Ahmed Mohamed",
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "The user's email address (used for login and identification)",
    example: "ahmed.mohamed@example.com",
  })
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @ApiProperty({
    description:
      "User password (must be 8–20 characters, containing uppercase, lowercase, number, and special character)",
    example: "P@ssw0rd123",
    minLength: 8,
    maxLength: 20,
  })
  @IsString()
  @MinLength(8, { message: "Password is too short (minimum 8 characters)" })
  @MaxLength(20, { message: "Password is too long (maximum 20 characters)" })
  // Uncomment if you want strong password regex validation
  // @Matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  //   {
  //     message:
  //       "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  //   },
  // )
  password: string;

  @ApiProperty({
    description: "The user's role in the system",
    enum: Role,
    example: Role.USER,
    default: Role.USER, // optional – shows as default in Swagger
  })
  @Optional()
  @IsEnum(Role, { message: "Invalid role" })
  role?: Role;
}