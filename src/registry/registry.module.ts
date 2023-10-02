import { Global, Module } from '@nestjs/common';
import { RegistryService } from './registry.service';

@Global()
@Module({
    imports: [],
    providers: [RegistryService],
    exports: [RegistryService],
})
export class RegistryModule {}
