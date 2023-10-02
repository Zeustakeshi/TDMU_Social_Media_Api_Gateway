import { TokenPayloadType } from './token.type';

export type RequestWithUser = {
    id: string;
} & TokenPayloadType;
