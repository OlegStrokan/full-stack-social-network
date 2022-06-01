import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class UpdateStatusDto {
  @ApiProperty({ example: "Simply clever", description: "Status" })
  @IsString({ message: "Must be a string" })
  @Length(6, 100, {
    message: "Status be longer then 6 symbols and smaller then 100 symbols",
  })
  readonly status: string;
}
