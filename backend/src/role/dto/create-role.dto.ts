import { IsString } from 'class-validator';

export class CreateRoleDto {
    @IsString({ message: 'Need to be a string' })
    readonly value: string;

    @IsString({ message: 'Need to be a string' })
    readonly description: string;
}
