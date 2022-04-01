import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import * as bcrypt from "bcryptjs";
import { LoginUserDto } from "../user/dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";
import { UserModel } from "../user/models/user.model";
import { MailService } from "../mail/mail.service";
import { ChangePasswordDto } from "../user/dto/change-password.dto";
import { AST } from "eslint";
import Token = AST.Token;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getByEmail(userDto.email);
    if (candidate) {
      throw new HttpException("User with this email already exist", HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);

    await this.userService.create({
      ...userDto,
      password: hashPassword,
    });

    return {
      message: "Registration was successful",
      statusCode: HttpStatus.OK,
    };
  }

  async login(userDto: LoginUserDto) {
    const userData = await this.validateUser(userDto);
    const token = await this.generateToken(userData);
    const user = await this.jwtService.verify(token.token);
    return {
      ...user,
      token: token.token,
    };
  }

  async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.getByEmail(userDto.email);

    if (!user) {
      throw new HttpException(`Incorrect email or password`, HttpStatus.UNAUTHORIZED);
    }

    const passwordEquals = await bcrypt.compare(userDto.password, user.password);

    if (user && passwordEquals) {
      return user;
    }

    throw new HttpException(`Incorrect email or password`, HttpStatus.UNAUTHORIZED);
  }

  private async generateToken(user: UserModel) {
    const payload = {
      username: user.username,
      id: user.id,
      roles: user.roles,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async me(token: string) {
    try {
      const bearer = token.split(" ")[0];
      const tokenValue = token.split(" ")[1];
      if (bearer === "Bearer" || tokenValue) {
        const user = this.jwtService.verify(tokenValue);
        return {
          data: user,
          statusCode: HttpStatus.OK,
        };
      }
    } catch {
      throw new HttpException(`You are not authorized`, HttpStatus.UNAUTHORIZED);
    }
  }

  async forgotPassword(email: string) {
    const user = await this.userService.getByEmail(email);

    if (!user) {
      throw new HttpException(`User with this email not fount`, HttpStatus.NOT_FOUND);
    }

    const token = await this.generateToken(user);
    const forgotLink = `http://localhost:8000/auth/forgot/password?token=${token.token}`;

    await this.mailService.forgotPasswordMail(user.email, forgotLink, user.fullname);
  }

  async changePassword(token: string, dto: ChangePasswordDto) {
    console.log(token, dto);
    const user = this.jwtService.decode(token);
    console.log(user);
    const hashPassword = await bcrypt.hash(dto.password, 5);
    await this.userService.updatePassword(13, hashPassword);
    return true;
  }
}
