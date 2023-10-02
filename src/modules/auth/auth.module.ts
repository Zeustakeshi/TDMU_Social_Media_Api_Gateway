import { Global, Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegistryService, ServiceName } from '@/registry/registry.service';

@Global()
@Module({
    providers: [
        {
            provide: ServiceName.AUTH_SERVICE,
            useFactory: (registryService: RegistryService) => {
                const authServiceOption = registryService.get(
                    ServiceName.AUTH_SERVICE,
                );
                return ClientProxyFactory.create(authServiceOption);
            },
            inject: [RegistryService],
        },
        AuthService,
    ],
    controllers: [AuthController],
    exports: [AuthService, ServiceName.AUTH_SERVICE],
})
export class AuthModule {}
