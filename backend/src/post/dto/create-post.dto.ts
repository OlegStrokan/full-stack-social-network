import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
  @ApiProperty({
    example: "New version of javascript!",
    description: "Post's title",
  })
  readonly title: string;

  @ApiProperty({
    example:
      "On July 02, we received a new version of ecmascript 2022. This version fixes a bunch of problems that developers encountered",
    description: "Post's content",
  })
  readonly content: string;

  @ApiProperty({ example: "82", description: "Post's author" })
  readonly userId: number;

  @ApiProperty({ example: "2983-2zed2-z2d2n-nac38", description: "Post's image/images" })
  readonly image?: string;
}
