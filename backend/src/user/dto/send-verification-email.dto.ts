import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SendVerificationEmailDto {
  @IsNotEmpty()
  @ApiProperty({
    example: "oleg14ua71@gmail.com",
    description: "Email adress",
  })
  readonly email: string;
}