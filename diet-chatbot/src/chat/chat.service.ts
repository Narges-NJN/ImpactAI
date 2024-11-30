/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AiService } from '../ai/ai.service';

@Injectable()
export class ChatService {
  constructor(private readonly aiService: AiService) {}

  async handleUserInput(userInput: string): Promise<string> {
    const prompt = `
      Sei un assistente per diabetici. Rispondi gentilmente con suggerimenti utili basati sul diabete.
      Utente: ${userInput}
      AI:
    `;
    return await this.aiService.generateResponse(prompt);
  }
}
