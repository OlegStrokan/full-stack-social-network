import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: "oleg14ua71@gmail.com",
    description: "Email adress",
  })
  readonly email: string;
}
