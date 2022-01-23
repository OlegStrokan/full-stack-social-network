import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class LoginUserDto {

    @ApiProperty({ example: 'user@gmail.com', description: 'Email address' })
    @IsString({ message: 'Must be a string' })
    @IsEmail({}, { message: 'Email not valid' })
    @Length(10, 40, { message: 'Email must be longer then 10 symbols and smaller then 40 symbols' })
    readonly email: string;

    @ApiProperty({ example: '258120', description: 'Password' })
    @IsString({ message: 'Must be a string' })
    @Length(6, 20, { message: 'Password must be longer then 6 symbols and smaller then 20 symbols' })
    readonly password: string;
}
