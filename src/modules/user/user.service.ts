import { ServiceName } from '@/registry/registry.service';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IUserService } from './user.service.interface';

@Injectable()
export class UserService implements IUserService {
    constructor(
        @Inject(ServiceName.AUTH_SERVICE)
        private authServiceClient: ClientProxy,
    ) {}

    getUserInfo(id: string) {
        return this.authServiceClient.send('user-get-info', id);
    }
}
