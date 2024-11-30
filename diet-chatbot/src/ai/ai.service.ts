import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AiService {
  private readonly apiUrl = 'https://api.aimlapi.com/chat/completions';
  private readonly apiKey: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('AI_API_KEY');
  }

  async generateResponse(prompt: string): Promise<string> {
    const response = await axios.post(
      this.apiUrl,
      {
        model: 'meta-llama/Meta-Llama-3-70B-Instruct-Turbo',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      },
    );
    return response.data.choices[0].message.content;
  }
}
