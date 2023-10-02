import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IAuthService } from './auth.service.interface';
import { Observable } from 'rxjs';
import { ServiceName } from '@/registry/registry.service';
import { TokenType } from '@/common/enums/token.enum';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        @Inject(ServiceName.AUTH_SERVICE)
        private authServiceClient: ClientProxy,
    ) {}

    register(data: any) {
        return this.authServiceClient.send('auth-register', data);
    }

    sendVerifyEmail(data: any): Observable<any> {
        return this.authServiceClient.send(
            'auth-register-send-mail-verify',
            data,
        );
    }

    verifyEmail({ token, userId }): Observable<any> {
        return this.authServiceClient.send('auth-register-verify-token', {
            token,
            userId,
        });
    }

    login(data: any): Observable<any> {
        return this.authServiceClient.send('auth-login', data);
    }

    extractToken(
        userId: string,
        token: string,
        type: TokenType,
    ): Observable<any> {
        return this.authServiceClient.send('auth-extract-token', {
            userId,
            token,
            type,
        });
    }

    getNewAccessToken(data: { userId: string; refreshToken: string }) {
        return this.authServiceClient.send('auth-refresh-token', data);
    }
}
