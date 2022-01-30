import {
    Controller,
    Post,
    Body,
    Param,
    Get,
    UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';

@Controller('users')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    @Post()
    create(@UploadedFile() avatar: File, @Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto, avatar);
    }

    @Post('/:id/role')
    addRole(@Param('id') id: number, @Body() dto: AddRoleDto) {
        return this.usersService.addRole(id, dto);
    }
}
