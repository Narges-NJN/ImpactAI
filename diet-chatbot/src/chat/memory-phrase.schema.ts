/* eslint-disable prettier/prettier */
import { Schema, Document } from 'mongoose';

export const MemoryPhraseSchema = new Schema({
  userId: { type: String, required: true },
  phrases: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

export interface MemoryPhrase extends Document {
  userId: string;
  phrases: string[];
  createdAt: Date;
}
