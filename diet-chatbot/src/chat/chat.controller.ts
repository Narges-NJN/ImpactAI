/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { MemoryPhraseService } from './memory-phrase.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly memoryPhraseService: MemoryPhraseService) {}

  // Endpoint to add a memory phrase
  @Post(':userId/memory-phrase')
  async addPhrase(
    @Param('userId') userId: string,
    @Body('phrase') phrase: string,
  ) {
    return this.memoryPhraseService.addPhrase(userId, phrase);
  }

  // Endpoint to retrieve all memory phrases for a user
  @Get(':userId/memory-phrase')
  async getPhrases(@Param('userId') userId: string) {
    return this.memoryPhraseService.getPhrases(userId);
  }
}
