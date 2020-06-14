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
            PORT: Joi.number().default(3000),
        }),
    })]
})
export class ConfigurationModule { }
