import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { SendVerificationEmailDto } from "./send-verification-email.dto";

export class SetPasswordDto extends SendVerificationEmailDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "2832ufj20soijdfw0939",
    description: "Verified code",
  })
  readonly code: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "2832ufj209",
    description: "Password",
  })
  readonly password: string;
}
