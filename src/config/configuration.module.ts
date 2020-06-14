import { Module } from '@nestjs/common';

import configuration from './configuration';
import { ConfigModule } from '@nestjs/config';
import { ENV_PATH } from '../config/constant';
import * as Joi from '@hapi/joi';

@Module({
    imports: [ConfigModule.forRoot({
        envFilePath: ENV_PATH,
        load: [configuration],
        validationSchema: Joi.object({
            NODE_ENV: Joi.string()
                .valid('development', 'production', 'test', 'provision')
                .default('development'),
            DEBUG: Joi.string(),
            PORT: Joi.number().default(3000),
            DB_HOST: Joi.string(),
            DB_PORT: Joi.number().default(3306),
            DB_USER: Joi.string(),
            DB_PASS: Joi.string(),
            DB_NAME: Joi.string(),
        }),
        validationOptions: {
            allowUnknown: true,
            abortEarly: true,
        },
    })]
})
export class ConfigurationModule { }
