import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/hello')
    ok() {
        return this.appService.getHello();
    }
}
