import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AmoCrmService } from './amo-crm/amo-crm.service';
import { AmoCrmController } from './amo-crm/amo-crm.controller';
import { AppConfigModule } from './config/app-config.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, AppConfigModule, ConfigModule.forRoot()],
  controllers: [AmoCrmController],
  providers: [AmoCrmService],
})
export class AppModule {}
