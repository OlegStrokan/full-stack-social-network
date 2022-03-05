import { Body, Controller, Get, Post, Headers, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "../user/dto/login-user.dto";
import { ApiOperation, ApiTags, ApiOkResponse } from "@nestjs/swagger";
import { UserModel } from "../user/models/user.model";
import { RolesGuard } from "./roles.guard";
import { Roles } from "./role-auth.decorator";

@ApiTags("Auth functional")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: "Registration" })
  @ApiOkResponse({ status: 200 })
  @Post("/registration")
  registration(
    @Body()
    userDto: CreateUserDto
  ) {
    return this.authService.registration(userDto);
  }

  @ApiOperation({ summary: "Login" })
  @ApiOkResponse({ status: 200, type: UserModel })
  @Post("/login")
  login(
    @Body()
    userDto: LoginUserDto
  ) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: "Is current user authorized" })
  @ApiOkResponse({ status: 200, type: UserModel })
  @Roles("ADMIN", "USER")
  @UseGuards(RolesGuard)
  @Get("/me")
  me(@Headers() headers) {
    return this.authService.me(headers.authorization);
  }
}
