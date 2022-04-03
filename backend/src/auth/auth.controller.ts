import { Body, Controller, Get, Post, Headers, UseGuards, Param, Patch } from "@nestjs/common";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "../user/dto/login-user.dto";
import { ApiOperation, ApiTags, ApiOkResponse } from "@nestjs/swagger";
import { UserModel } from "../user/models/user.model";
import { RolesGuard } from "./guards/roles.guard";
import { Roles } from "./decorators/role-auth.decorator";
import { ForgotPasswordDto } from "../user/dto/forgot-password.dto";
import { ChangePasswordDto } from "../user/dto/change-password.dto";

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

  @ApiOperation({ summary: "Forgot password request" })
  @ApiOkResponse({ status: 200, type: UserModel })
  @Post("/forgot_password")
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.email);
  }

  @ApiOperation({ summary: "Change password" })
  @ApiOkResponse({ status: 200, type: UserModel })
  @Patch("/change_password/:token")
  changePassword(@Body() dto: ChangePasswordDto, @Param("token") token: string) {
    return this.authService.changePassword(token, dto);
  }
}
