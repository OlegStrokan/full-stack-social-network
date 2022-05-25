import { ApiProperty } from "@nestjs/swagger";
import { SendVerificationEmailDto } from "./send-verification-email.dto";

export class VerifyCodeDto extends SendVerificationEmailDto {
  @ApiProperty({
    example: "283209",
    description: "Code",
  })
  readonly code: string;
}
