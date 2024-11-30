/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { AiModule } from '../ai/ai.module';
import { MemoryPhraseService } from './memory-phrase.service';
import { MemoryPhraseSchema } from './memory-phrase.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AiModule,
    MongooseModule.forFeature([{ name: 'MemoryPhrase', schema: MemoryPhraseSchema }]),
  ],
  controllers: [ChatController],
  providers: [ChatService, MemoryPhraseService],
  exports: [ChatService],
})
export class ChatModule {}
  