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
} from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { UpdateStatusDto } from "../user/dto/update-status.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserModel } from "../user/models/user.model";
import { UpdateUserDto } from "../user/dto/update-user.dto";

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
  @Patch("/:id/status")
  async changeStatus(@Param("id") id: string, @Body() userDto: UpdateStatusDto) {
    return this.profileService.changeStatus(+id, userDto);
  }

  @ApiOperation({ summary: "Follow to user" })
  @ApiOkResponse({ status: 200 })
  @Post("/:user_id/follow/:follow_id")
  async follow(@Param("user_id") user_id: string, @Param("follow_id") follow_id: string) {
    return this.profileService.follow(+user_id, +follow_id);
  }

  @ApiOperation({ summary: "Unfollow user" })
  @ApiOkResponse({ status: 200 })
  @Delete("/:user_id/unfollow/:unfollow_id")
  async unfollow(
    @Param("user_id") user_id: string,
    @Param("unfollow_id") unfollow_id: string
  ) {
    return this.profileService.unfollow(+user_id, +unfollow_id);
  }

  @ApiOperation({ summary: "Change user's avatar" })
  @ApiOkResponse({ status: 200 })
  @Patch("/:id/avatar")
  @UseInterceptors(FileInterceptor("avatar"))
  async changeAvatar(@Param("id") id: string, @UploadedFile() avatar) {
    return this.profileService.changeAvatar(+id, avatar);
  }

  @ApiOperation({ summary: "Activate user's profile" })
  @ApiOkResponse({ status: 200, type: UserModel })
  @Get("/:id/activate")
  async activateProfile(@Param("id") id: string) {
    return this.profileService.activateProfile(+id);
  }

  @ApiOperation({ summary: "Update user's profile" })
  @ApiOkResponse({ status: 200, type: UserModel })
  @Patch("/:id")
  async updateProfile(@Param("id") id: string, @Body() dto: UpdateUserDto) {
    return this.profileService.updateProfile(+id, dto);
  }
}
