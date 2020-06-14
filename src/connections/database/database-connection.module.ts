import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';

@Module({
    imports: [TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
            type: 'mysql',
            host: configService.get<string>('DB_HOST'),
            port: configService.get<number>('DB_PORT'),
            username: configService.get<string>('DB_USER'),
            password: configService.get<string>('DB_PASS'),
            database: configService.get<string>('DB_NAME'),
            entities: [path.resolve(`${process.cwd()}/dist/models/**/*.entity.js`)],
            synchronize: true,
            logging: true,
            subscribers: [path.resolve(`${process.cwd()}/dist/models/**/*.subscriber.js`)],
        }),
        inject: [ConfigService],
    })],
})
export class DatabaseConnectionModule { }
