import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty({
        example: 'ADMIN',
        description: "Value of user's permission",
    })
    @IsString({ message: 'Must be a string' })
    readonly value: string;

    @ApiProperty({
        example: "This is user's permission for admin",
        description: "Description of user's permission",
    })
    @IsString({ message: 'Must be a string' })
    readonly description: string;
}
