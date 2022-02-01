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
import { UpdateStatusDto } from '../user/dto/update-status.dto';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) {}

    @Get('/:id')
    async getProfile(@Param('id') id: string) {
        return this.profileService.getProfile(+id);
    }

    @Patch('/:id/status')
    async changeStatus(@Param('id') id: string, @Body() userDto: UpdateStatusDto) {
        return this.profileService.changeStatus(+id, userDto);
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
    async changeAvatar(@Param('id') id: string, @UploadedFile() avatar) {
        return this.profileService.changeAvatar(+id, avatar);
    }

    @Get('/:id/activate')
    async activateProfile(@Param('id') id: string) {
        return this.profileService.activateProfile(+id);
    }
}
