import { ApiProperty } from "@nestjs/swagger";
import { VerifyCodeDto } from "./verify-code.dto";

export class SetPasswordDto extends VerifyCodeDto {
  @ApiProperty({
    example: "2832ufj209",
    description: "Password",
  })
  readonly password: string;
}
