import { Controller, Post, Body, Param, Get, Patch, Delete } from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserModel } from './models/user.model';

@ApiTags('Users functional')
@Controller('users')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @ApiOperation({
        summary: 'Get users',
    })
    @ApiOkResponse({
        status: 200,
        type: [UserModel],
    })
    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    @ApiOperation({
        summary: 'Create new user',
    })
    @ApiOkResponse({
        status: 200,
        type: UserModel,
    })
    @Post()
    create(
        @Body()
        createUserDto: CreateUserDto,
    ) {
        return this.usersService.create(createUserDto);
    }

    @ApiOperation({
        summary: 'Add role to user',
    })
    @ApiOkResponse({
        status: 200,
        type: AddRoleDto,
    })
    @Post('/:id/role')
    addRole(
        @Param('id')
        id: string,
        @Body()
        dto: AddRoleDto,
    ) {
        return this.usersService.addRole(+id, dto);
    }

    @ApiOperation({
        summary: 'Ban a user',
    })
    @ApiOkResponse({
        status: 200,
        type: UserModel,
    })
    @Patch('/:id/ban')
    ban(
        @Param('id')
        id: string,
        @Body()
        dto: BanUserDto,
    ) {
        return this.usersService.ban(+id, dto);
    }

    @ApiOperation({
        summary: 'Unban a user',
    })
    @ApiOkResponse({
        status: 200,
        type: UserModel,
    })
    @Delete('/:id/ban')
    unban(
        @Param('id')
            id: string) {
        return this.usersService.unban(+id);
    }
}
