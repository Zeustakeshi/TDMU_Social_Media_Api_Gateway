import { ServiceName } from '@/registry/registry.service';
import { HttpStatus } from '@nestjs/common';

export interface ServiceResponseType {
    status: HttpStatus;
    mess: string;
    serviceName: ServiceName;
    body: {
        data: any;
        error: string | null;
    };
}
