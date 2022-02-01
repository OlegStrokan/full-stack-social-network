import { Controller, Post, Body, Param, Get, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Post('/:id/role')
    addRole(@Param('id') id: string, @Body() dto: AddRoleDto) {
        return this.usersService.addRole(+id, dto);
    }

    @Patch('/:id/ban')
    ban(@Param('id') id: string, @Body() dto: BanUserDto) {
        return this.usersService.ban(+id, dto);
    }
}
