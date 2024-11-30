/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose'; 
import { ChatModule } from './chat/chat.module';
import { AiModule } from './ai/ai.module';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ChatModule,
    AiModule,
    TelegramModule,
  ],
})
export class AppModule {}
