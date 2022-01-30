import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
    @ApiProperty({ example: 'ADMIN', description: "User's permission" })
    @IsString({ message: 'Must be a string' })
    readonly value: string;
}
