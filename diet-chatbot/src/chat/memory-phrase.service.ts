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
existingRecord.phrases.push(phrase);
    return existingRecord.save();
    }

    const newRecord = new this.memoryPhraseModel({
    userId,
    phrases: [phrase],
    });
    return newRecord.save();
}
  async getPhrases(userId: string): Promise<string[]> {
const record = await this.memoryPhraseModel.findOne({ userId });
  return record ? record.phrases : [];
}
}