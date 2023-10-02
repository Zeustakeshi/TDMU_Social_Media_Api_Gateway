import { TokenType } from '@/common/enums/token.enum';
import { Observable } from 'rxjs';

export interface IAuthService {
    register(data: any): Observable<any>;
    sendVerifyEmail(data: any): Observable<any>;
    verifyEmail(data: { token: string; userId: string }): Observable<any>;
    login(data: any): Observable<any>;
    extractToken(
        userId: string,
        token: string,
        type: TokenType,
    ): Observable<any>;

    getNewAccessToken(data: {
        userId: string;
        refreshToken: string;
    }): Observable<any>;
}
