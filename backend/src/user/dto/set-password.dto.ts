import { ApiProperty } from "@nestjs/swagger";
import { VerifyCodeDto } from "./verify-code.dto";
export class SetPasswordDto extends VerifyCodeDto {
import { IsNotEmpty, IsString } from "class-validator";
import { SendVerificationEmailDto } from "./send-verification-email.dto";

export class SetPasswordDto extends SendVerificationEmailDto {
  @ApiProperty({
    example: "2832ufj20soijdfw0939",
    description: "Verified code",
  })
  readonly code: string;
  
  @ApiProperty({
    example: "2832ufj209",
    description: "Password",
  })
  readonly password: string;
}
