import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramService } from './telegram.service';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [ConfigModule, ChatModule],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}
