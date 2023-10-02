import { ROLE } from '@/common/enums/user.enum';

export type TokenPayloadType = {
    sub: string;
    email: string;
    username: string;
    role: ROLE;
};
