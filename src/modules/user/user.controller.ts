import { GetCurrentUser } from '@/common/decorators/getCurrentUser.decorator';
import { AccessTokenGuard } from '@/common/guards/token/accessToken.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RequestWithUser } from '@/common/types/auth/request.type';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/info')
    @UseGuards(AccessTokenGuard)
    async getUserInfo(@GetCurrentUser() user: RequestWithUser) {
        return this.userService.getUserInfo(user.id);
    }

    @Get('/hello')
    @UseGuards(AccessTokenGuard)
    async hello(@GetCurrentUser() user: RequestWithUser) {
        return {
            status: 200,
            mess: 'ok',
            serviceName: 'AUTH_SERVICE',
            body: {
                data: {
                    mess: 'hello',
                    user: user,
                },
                error: null,
            },
        };
        // return this.userService.getUserInfo(user.id);
    }
}
