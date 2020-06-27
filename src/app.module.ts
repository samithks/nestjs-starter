import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/configuration.module';
import { DatabaseConnectionModule } from './connections/database/database-connection.module';
import { RemoteUserModule } from './remote-methods/user/user.module';

@Module({
  imports: [ConfigurationModule, DatabaseConnectionModule, RemoteUserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
