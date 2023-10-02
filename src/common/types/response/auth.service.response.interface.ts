import { ServiceResponseType } from './serviceReponse.interface';

export interface AuthServiceRegisterResponseType extends ServiceResponseType {
    body: {
        data: {
            userId: string;
        } | null;
        error: string | null;
    };
}

export interface AuthServiceSendVerifyEmailResponseType
    extends ServiceResponseType {
    body: {
        data: null;
        error: string | null;
    };
}

export interface AuthServiceVerifyEmailReponseType extends ServiceResponseType {
    body: {
        data: {
            user: {
                id: string;
                username: string;
                email: string;
                birthday: string;
                gender: 'MALE' | 'FEMALE';
            };
            token: {
                accessToken: string;
                refreshToken: string;
            };
        } | null;
        error: string | null;
    };
}
