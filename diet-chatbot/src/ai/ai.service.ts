import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiService {
  private readonly apiUrl = 'https://api.aimlapi.com/chat/completions';
  private readonly apiKey: string;
  private readonly assistantName: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('AI_API_KEY');
    this.assistantName = this.configService.get<string>('ASSISTANT_NAME');
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'meta-llama/Meta-Llama-3-8B-Instruct-Turbo',
          messages: [
            { role: 'assistant', content: `Il tuo nome e' ${this.assistantName}. Sei un assistente per diabetici. Rispondi gentilmente con suggerimenti utili basati sul diabete.` },
            { role: 'user', content: prompt }
          ],
        }),
      });

      // Gestione della risposta
      if (!response.ok) {
        throw new Error(`Errore API: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Errore durante la chiamata all’API:', error);
      throw new Error('Impossibile generare una risposta. Riprova più tardi.');
    }
  }
}
