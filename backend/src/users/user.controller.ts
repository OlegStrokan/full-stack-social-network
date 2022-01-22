import { Controller, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';

@Controller('users')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Post('/role')
    addRole(@Param('id') id: number, @Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto ,id)
    }
}
