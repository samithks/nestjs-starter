import { Module } from '@nestjs/common';

import configuration from './configuration';
import { ConfigModule } from '@nestjs/config';
import { ENV_PATH } from '../config/constant';

@Module({
    imports: [ConfigModule.forRoot({
        envFilePath: ENV_PATH,
        load: [configuration],
    })]
})
export class ConfigurationModule { }
