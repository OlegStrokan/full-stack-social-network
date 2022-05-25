import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class BanUserDto {
  @ApiProperty({
    example: "You have been banned for bad words",
    description: "ban a user for violating the rules ",
  })
  readonly banReason: string;
}
