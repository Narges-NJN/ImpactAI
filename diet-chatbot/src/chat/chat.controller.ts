import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { MemoryPhraseService } from './memory-phrase.service';


@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService, private readonly memoryPhraseService: MemoryPhraseService) {}

  @Post('message')
  async sendMessage(@Body() body: { message: string, name: string }): Promise<string> {
    const { message, name } = body;

    // Passa sia il messaggio che le informazioni dell'utente
    const response = await this.chatService.handleUserInput(message, { name, history: [] });
    return response;
  }

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
