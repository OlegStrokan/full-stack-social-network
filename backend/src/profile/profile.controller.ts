import {
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UploadedFile,
    Put,
    Body,
} from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) {}

    @Get('/:id')
    async getProfile(@Param('id') id: string) {
        return this.profileService.getProfile(+id);
    }

    @Put('/:id/status')
    async changeStatus(@Param('id') id: string, @Body() status: string) {
        return this.profileService.changeStatus(+id, status);
    }

    @Post('/:user_id/follow/:follow_id')
    async follow(
        @Param('user_id') user_id: string,
        @Param('follow_id') follow_id: string,
    ) {
        return this.profileService.follow(+user_id, +follow_id);
    }

    @Delete('/:user_id/unfollow/:unfollow_id')
    async unfollow(
        @Param('user_id') user_id: string,
        @Param('unfollow_id') unfollow_id: string,
    ) {
        return this.profileService.unfollow(+user_id, +unfollow_id);
    }

    @Patch('/:id/avatar')
    async changeAvatar(@Param('id') id: string, @UploadedFile() avatar: File) {
        return this.profileService.changeAvatar(+id, avatar);
    }

    @Get('/:id/avatar')
    async activateProfile(@Param('id') id: string) {
        return this.profileService.activateProfile(+id);
    }
}
