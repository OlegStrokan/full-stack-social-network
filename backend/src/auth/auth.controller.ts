import { Body, Controller, Get, Post, Headers, Patch } from "@nestjs/common";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "../user/dto/login-user.dto";
import { ApiOperation, ApiTags, ApiOkResponse } from "@nestjs/swagger";
import { UserModel } from "../user/models/user.model";
import { VerifyCodeDto } from "../user/dto/verify-code.dto";
import { SetPasswordDto } from "../user/dto/set-password.dto";
import { SendVerificationEmailDto } from "../user/dto/send-verification-email.dto";

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
  @Get("/me")
  me(@Headers() headers) {
    return this.authService.me(headers.authorization);
  }

  @ApiOperation({ summary: "Send verification email" })
  @ApiOkResponse({ status: 200, type: UserModel })
  @Post("/send_verification_email")
  sendVerificationEmail(@Body() dto: SendVerificationEmailDto): Promise<void> {
    return this.authService.sendVerificationEmail(dto.email);
  }

  @ApiOperation({ summary: "Verify code" })
  @ApiOkResponse({ status: 200, type: UserModel })
  @Patch("/verify_code")
  verifyCode(@Body() dto: VerifyCodeDto) {
    return this.authService.verifyCode(dto.email, dto.code);
  }

  @ApiOperation({ summary: "Change password" })
  @ApiOkResponse({ status: 200, type: UserModel })
  @Patch("/set_password")
  changePassword(@Body() dto: SetPasswordDto): Promise<boolean> {
    return this.authService.changePassword(dto.email, dto.code, dto.password);
  }
}
