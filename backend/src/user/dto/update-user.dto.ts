import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({ example: 'user@gmail.com', description: 'Email address' })
    @IsString({ message: 'Must be a string' })
    @IsEmail({}, { message: 'Email not valid' })
    @Length(10, 40, {
        message:
            'Email must be longer then 10 symbols and smaller then 40 symbols',
    })
    readonly email: string;

    @ApiProperty({ example: 'stroka01', description: 'User name' })
    @IsString({ message: 'Must be a string' })
    @Length(5, 20, {
        message:
            'User name must be longer then 5 symbols and smaller then 20 symbols',
    })
    readonly username: string;

    @ApiProperty({ example: 'Oleh Strokan', description: 'Full name' })
    @IsString({ message: 'Must be a string' })
    @Length(5, 20, {
        message:
            'Full name must be longer then 5 symbols and smaller then 20 symbols',
    })
    readonly fullname: string;
}
