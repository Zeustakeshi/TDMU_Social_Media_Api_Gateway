import * as dotenv from 'dotenv';
dotenv.config();

export enum ENVIRONMENT {
    PRODUCTION = 'PRODUCTION',
    DEVELOPMENT = 'DEVELOPMENT',
    TESTTING = 'TESTTING',
}

const devConfigs = {};
const productConfigs = {};
const testConfigs = {};

const getConfig = () => {
    const envType = process.env.NODE_ENV;
    switch (envType) {
        case ENVIRONMENT.PRODUCTION:
            return productConfigs;
        case ENVIRONMENT.DEVELOPMENT:
            return devConfigs;
        case ENVIRONMENT.TESTTING:
            return testConfigs;
        default:
            break;
    }
};

interface ConfigType {
    evironment: keyof typeof ENVIRONMENT;
    port: number;
    authServicePort: number;
    authServiceHost: string;
}

const configs = {
    ...getConfig(),
    evironment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10),
    authServiceHost: process.env.AUTH_SERVICE_HOST,
    authServicePort: parseInt(process.env.AUTH_SERVICE_PORT, 10),
} as ConfigType;

export default configs;
