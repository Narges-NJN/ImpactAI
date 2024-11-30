import { Injectable } from '@nestjs/common';
import { AiService } from '../ai/ai.service';

@Injectable()
export class ChatService {
  constructor(private readonly aiService: AiService) {}

  async handleUserInput(userInput: string, userInfo: { name: string; history: { question: string; answer: string }[] }): Promise<string> {
    const { name, history } = userInfo;

    // Crea un contesto basato sulla cronologia
    const context = history
      .map((entry, index) => `Q${index + 1}: ${entry.question}\nA${index + 1}: ${entry.answer}`)
      .join('\n');

    // Genera un prompt che include la cronologia
    const prompt = `
      ###############
      INFO USER
      Username: ${name}

      ###############
      HISTORY:
      ${context}
      
      ###############
      PROMPT:
      ${userInput}
    `;

    // Chiama il servizio AI per ottenere la risposta
    return await this.aiService.generateResponse(prompt);
  }
}
