import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose'; 
import { ChatModule } from './chat/chat.module';
import { AiModule } from './ai/ai.module';
import { TelegramModule } from './telegram/telegram.module';
import { DatasetController } from './dataset/dataset.controller';
import { DatasetModule } from './dataset/dataset.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ChatModule,
    AiModule,
    TelegramModule,
    DatasetModule,
  ],
  controllers: [DatasetController],
})
export class AppModule {}
