import { INestApplication } from '@nestjs/common';
import * as compression from 'compression';
import helmet from 'helmet';
import * as morgan from 'morgan';

import configs, { ENVIRONMENT } from '../configs/configuration';

const isDev = configs.evironment === ENVIRONMENT.DEVELOPMENT;
const isProd = configs.evironment === ENVIRONMENT.PRODUCTION;

export default (app: INestApplication) => {
    if (isProd) {
        // middleware
        app.use(compression());
        app.use(helmet());
    }

    if (isDev) {
        // middeware for dev here
        app.use(morgan('dev'));
    }

    // global middle ware
    // app.use(express.json());
};
