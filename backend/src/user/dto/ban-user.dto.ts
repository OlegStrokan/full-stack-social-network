import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class BanUserDto {
  @ApiProperty({
    example: "You have been banned for bad words",
    description: "ban a user for violating the rules ",
  })
  @IsString({ message: "Must be a string" })
  @Length(6, 40, {
    message: "Ban reason must be longer then 6 symbols and smaller then 20 symbols",
  })
  readonly banReason: string;
}
