import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class UpdatePostDto {
  @ApiProperty({
    example: "New version of javascript!",
    description: "Post's title",
  })
  @IsString({ message: "Must be a string" })
  readonly title: string;

  @ApiProperty({
    example:
      "On July 02, we received a new version of ecmascript 2022. This version fixes a bunch of problems that developers encountered",
    description: "Post's content",
  })
  @IsString({ message: "Must be a string" })
  readonly content: string;

  @ApiProperty({
    example: "2983-2zed2-z2d2n-nac38",
    description: "Post's image/images",
  })
  @IsString({ message: "Must be a string or array of string", each: true })
  readonly image: string | string[];

  @ApiProperty({
    example: "32",
    description: "Post's likes count",
  })
  @IsNumber()
  readonly likesCount: number;
}
