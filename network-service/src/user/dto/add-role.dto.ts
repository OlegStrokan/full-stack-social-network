import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto {
  @ApiProperty({ example: "admin", description: "User's permission" })
  readonly value: string;
}
