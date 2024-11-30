import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import * as mammoth from 'mammoth';
import { DatasetService } from '../dataset/dataset.service'; // Importa il DatasetService

@Injectable()
export class AiService implements OnModuleInit {
  private readonly apiUrl = 'https://api.aimlapi.com/chat/completions';
  private readonly apiKey: string;
  private readonly assistantFilePath: string;
  private assistantContent: string; 
  private foodData: string; // Dati sugli alimenti

  constructor(
    private readonly configService: ConfigService,
    private readonly datasetService: DatasetService, // Inietta il DatasetService
  ) {
    this.apiKey = this.configService.get<string>('AI_API_KEY');
    this.assistantFilePath = path.resolve(__dirname, '../../specialist_prompt.docx'); // Percorso al file docx
  }

  async onModuleInit() {
    // Carica il contenuto grezzo dell'assistente dal file docx
    this.assistantContent = await this.loadAssistantContent();

    // Prepara i dati sugli alimenti
    const dataset = this.datasetService.getDataset();
    this.foodData = dataset
      .filter((record) => record['Index Glycemic'] < 55) // Alimenti a basso indice glicemico
      .slice(0, 50) // Limita a 50 risultati
      .map((record) => {
        const food = record['Food'];
        const glycemicIndex = record['Index Glycemic'];
        const calories = record['Calories'];
        const protein = record['Protein'];
        const fat = record['Fat'];
        const carbs = record['Carbohydrates'];

        return `${food} -> GI: ${glycemicIndex}, Calories: ${calories}, Protein: ${protein}, Fat: ${fat}, Carbs: ${carbs}`;
      })
      .join('\n');
  }

  private async loadAssistantContent(): Promise<string> {
    try {
      const fileBuffer = fs.readFileSync(this.assistantFilePath);
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      return result.value.trim();
    } catch (error) {
      console.error('Errore durante la lettura del file docx:', error);
      throw new Error('Impossibile leggere il file di configurazione dell’assistente.');
    }
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      const fullPromptAgent = `
        ${this.assistantContent}

        Informazioni sugli alimenti:
        ${this.foodData}
      `;
  
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'meta-llama/Meta-Llama-3-70B-Instruct-Lite',
          messages: [
            { role: 'assistant', content: fullPromptAgent.trim() },
            { role: 'user', content: prompt },
          ],
        }),
      });
  
      // Log completo della risposta per analizzare eventuali errori
      if (!response.ok) {
        const errorBody = await response.text();
        console.error('Errore dettagliato API:', {
          status: response.status,
          statusText: response.statusText,
          body: errorBody,
        });
        throw new Error(`Errore API: ${response.statusText}`);
      }
  
      const data = await response.json();
      //console.log('Risposta API:', data);
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Errore durante la chiamata all’API:', error.message);
    }
  }  
}
