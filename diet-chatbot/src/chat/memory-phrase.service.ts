/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MemoryPhrase } from './memory-phrase.schema';

@Injectable()
export class MemoryPhraseService {
constructor(
    @InjectModel('MemoryPhrase') private readonly memoryPhraseModel: Model<MemoryPhrase>,
) {}

  // Save a new phrase for a user
  async addPhrase(userId: string, phrase: string): Promise<MemoryPhrase> {
    const existingRecord = await this.memoryPhraseModel.findOne({ userId });

    if (existingRecord) {
      // Verifica se la frase esiste già
      if (!existingRecord.phrases.includes(phrase)) {
        existingRecord.phrases.push(phrase);
        return existingRecord.save();
      }
      return existingRecord; // Non aggiunge nulla se la frase esiste già
    }

    console.log('new record => ', phrase);

    // Se non esiste un record per l'utente, creane uno nuovo
    const newRecord = new this.memoryPhraseModel({
      userId,
      phrases: [phrase],
    });
    return newRecord.save();
  }

  async removePhrase(userId: string, phrase: string): Promise<MemoryPhrase | null> {
    const record = await this.memoryPhraseModel.findOne({ userId });
  
    if (record) {
      // Filtra le frasi per rimuovere quella specificata
      record.phrases = record.phrases.filter((p) => p !== phrase);
  
      // Salva il record aggiornato
      if (record.phrases.length === 0) {
        // Se non ci sono più frasi, elimina il record
        await this.memoryPhraseModel.deleteOne({ userId });
        return null;
      }
  
      return record.save();
    }
  
    // Se non esiste un record per l'utente, ritorna null
    return null;
  }  

  async getPhrases(userId: string): Promise<string[]> {
    const record = await this.memoryPhraseModel.findOne({ userId });
    console.log('record => ', record);
    return record ? record.phrases : [];
  }
}