import { IS_PUBLIC_KEY } from '@/common/decorators/auth.decorator';
import { AuthService } from '@/modules/auth/auth.service';
import {
    BadRequestException,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { firstValueFrom } from 'rxjs';
import { TokenGaurd } from './token.guard';
import { TokenType } from '@/common/enums/token.enum';
import { ServiceResponseType } from '@/common/types/response/serviceReponse.interface';

@Injectable()
export class AccessTokenGuard extends TokenGaurd {
    constructor(
        private reflector: Reflector,
        private authService: AuthService,
    ) {
        super();
    }

    async canActivate(context: ExecutionContext) {
        // check public route
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (isPublic) return true;

        const request = context.switchToHttp().getRequest();

        // get access token and userId from header
        const token = this.extractTokenFromHeader(request);
        const userId = this.extractUserIdFromHeader(request);
        if (!token) throw new UnauthorizedException();
        if (!userId) throw new BadRequestException();

        try {
            const response: ServiceResponseType = await firstValueFrom(
                this.authService.extractToken(
                    userId,
                    token,
                    TokenType.ACCESS_TOKEN,
                ),
            );

            request.user = {
                ...response.body.data,
                id: response.body.data.sub,
            };

            return true;
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }
}
