import { Injectable } from '@nestjs/common';
import { AiService } from '../ai/ai.service';

@Injectable()
export class ChatService {
  constructor(private readonly aiService: AiService) {}

  async handleUserInput(userInput: string, userInfo: { name: string }): Promise<string> {
    const prompt = `
      Info Utente: ${userInfo.name}
      Domanda: ${userInput}
    `;

    // Genera la risposta utilizzando AiService
    return await this.aiService.generateResponse(prompt);
  }
}
