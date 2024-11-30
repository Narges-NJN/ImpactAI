import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ChatHistory } from './chatHistory.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ChatHistory, (chatHistory) => chatHistory.user)
  chatHistory: ChatHistory[];
}
