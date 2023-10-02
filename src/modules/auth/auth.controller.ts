import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async register(@Body() data: any) {
        return this.authService.register(data);
    }

    @HttpCode(HttpStatus.OK)
    @Post('send-verify-email')
    async sendVerifyEmail(@Body() data: any) {
        return this.authService.sendVerifyEmail(data);
    }

    @HttpCode(HttpStatus.OK)
    @Get('verify-email')
    async verifyEmail(
        @Query('token') token: string,
        @Query('userId') userId: string,
    ) {
        return this.authService.verifyEmail({ userId, token });
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() data: any) {
        return this.authService.login(data);
    }

    @Post('refresh-token')
    getNewAccessToken(@Body() data: { refreshToken: string; userId: string }) {
        return this.authService.getNewAccessToken(data);
    }
}
