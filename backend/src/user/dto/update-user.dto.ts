import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class UpdateUserDto {
  @ApiProperty({ example: "user@gmail.com", description: "Email address" })
  @IsString({ message: "Must be a string" })
  @IsEmail({}, { message: "Email not valid" })
  @Length(10, 40, {
    message: "Email must be longer then 10 symbols and smaller then 40 symbols",
  })
  readonly email: string;

  @ApiProperty({ example: "Oleh Strokan", description: "Full name" })
  @IsString({ message: "Must be a string" })
  @Length(5, 20, {
    message: "Full name must be longer then 5 symbols and smaller then 20 symbols",
  })
  readonly fullname: string;

  @ApiProperty({ example: "Madison Square 5", description: "Location" })
  @IsString({ message: "Must be a string" })
  @Length(5, 50, { message: "Location then 5 symbols and smaller then 50 symbols" })
  readonly location: string;

  @ApiProperty({ example: "Programmer", description: "Current job" })
  @IsString({ message: "Must be a string" })
  @Length(2, 20, {
    message: "Jo must be longer then 2 symbols and smaller then 20 symbols",
  })
  readonly job: string;

  @ApiProperty({ example: "02.11.2001", description: "Date of birth" })
  @IsString({ message: "Must be a string" })
  @Length(2, 20, {
    message: "Full name must be longer then 2 symbols and smaller then 20 symbols",
  })
  readonly birth: string;

  @ApiProperty({ example: "I am Oleh Strokan...", description: "Description about yourself" })
  @IsString({ message: "Must be a string" })
  @Length(5, 20, {
    message: "Full name must be longer then 5 symbols and smaller then 20 symbols",
  })
  readonly info: string;

  @ApiProperty({ example: "Contribution to open source", description: "Interests" })
  @IsString({ message: "Must be a string" })
  @Length(5, 50, {
    message: "Full name must be longer then 5 symbols and smaller then 50 symbols",
  })
  readonly interests: string;
}
