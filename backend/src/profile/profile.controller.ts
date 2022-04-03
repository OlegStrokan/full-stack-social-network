import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  Body,
  UseInterceptors,
  UseGuards,
} from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { UpdateStatusDto } from "../user/dto/update-status.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserModel } from "../user/models/user.model";
import { UpdateUserDto } from "../user/dto/update-user.dto";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/role-auth.decorator";

@ApiTags("Profile functional")
@Controller("profile")
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @ApiOperation({ summary: "Get user's profile" })
  @ApiOkResponse({ status: 200, type: UserModel })
  @Get("/:id")
  async getProfile(@Param("id") id: string) {
    return this.profileService.getProfile(+id);
  }

  @ApiOperation({ summary: "Change user's status" })
  @ApiOkResponse({ status: 200, type: UserModel })
  @Roles("ADMIN", "USER")
  @UseGuards(RolesGuard)
  @Patch("/:id/status")
  async changeStatus(@Param("id") id: string, @Body() userDto: UpdateStatusDto) {
    return this.profileService.changeStatus(+id, userDto);
  }

  @ApiOperation({ summary: "Follow to user" })
  @ApiOkResponse({ status: 200 })
  @Roles("ADMIN", "USER")
  @UseGuards(RolesGuard)
  @Post("/:user_id/follow/:follow_id")
  async follow(@Param("user_id") user_id: string, @Param("follow_id") follow_id: string) {
    return this.profileService.follow(+user_id, +follow_id);
  }

  @ApiOperation({ summary: "Unfollow user" })
  @ApiOkResponse({ status: 200 })
  @Roles("ADMIN", "USER")
  @UseGuards(RolesGuard)
  @Delete("/:user_id/unfollow/:unfollow_id")
  async unfollow(
    @Param("user_id") user_id: string,
    @Param("unfollow_id") unfollow_id: string
  ) {
    return this.profileService.unfollow(+user_id, +unfollow_id);
  }

  @ApiOperation({ summary: "Change user's avatar" })
  @ApiOkResponse({ status: 200 })
  @Roles("ADMIN", "USER")
  @UseGuards(RolesGuard)
  @Patch("/:id/avatar")
  @UseInterceptors(FileInterceptor("avatar"))
  async changeAvatar(@Param("id") id: string, @UploadedFile() avatar) {
    return this.profileService.changeAvatar(+id, avatar);
  }

  @ApiOperation({ summary: "Activate user's profile" })
  @ApiOkResponse({ status: 200, type: UserModel })
  @Roles("ADMIN", "USER")
  @UseGuards(RolesGuard)
  @Get("/:id/activate")
  async activateProfile(@Param("id") id: string) {
    return this.profileService.activateProfile(+id);
  }

  @ApiOperation({ summary: "Update user's profile" })
  @ApiOkResponse({ status: 200, type: UserModel })
  @Roles("ADMIN", "USER")
  @UseGuards(RolesGuard)
  @Patch("/:id")
  async updateProfile(@Param("id") id: string, @Body() dto: UpdateUserDto) {
    return this.profileService.updateProfile(+id, dto);
  }

  @ApiOperation({ summary: "Activate user's profile" })
  @ApiOkResponse({ status: 200, type: UserModel })
  @Roles("ADMIN", "USER")
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor("image"))
  @Patch("/:id/image")
  async addPhoto(@Param("id") id: string, @UploadedFile() image) {
    return this.profileService.addPhoto(+id, image);
  }
}
