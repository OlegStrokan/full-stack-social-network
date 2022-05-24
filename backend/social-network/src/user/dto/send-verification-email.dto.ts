import { ApiProperty } from "@nestjs/swagger";

export class SendVerificationEmailDto {
  @ApiProperty({
    example: "oleg14ua71@gmail.com",
    description: "Email adress",
  })
  readonly email: string;
}
