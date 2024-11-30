import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('message')
  async sendMessage(@Body() body: { message: string, name: string }): Promise<string> {
    const { message, name } = body;

    // Passa sia il messaggio che le informazioni dell'utente
    const response = await this.chatService.handleUserInput(message, { name });
    return response;
  }
}
