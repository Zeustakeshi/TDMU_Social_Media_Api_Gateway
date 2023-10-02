import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import configs from './configs/configuration';
import { RegistryModule } from './registry/registry.module';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import { RegistryService, ServiceName } from './registry/registry.service';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            // envFilePath:
            //     configs.evironment === 'DEVELOPMENT' ? '.env.dev' : '.env',
        }),
        AuthModule,
        PostModule,
        UserModule,
        RegistryModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
