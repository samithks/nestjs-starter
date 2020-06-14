import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConnectionModule } from './connections/database/database-connection.module';

@Module({
  imports: [DatabaseConnectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
