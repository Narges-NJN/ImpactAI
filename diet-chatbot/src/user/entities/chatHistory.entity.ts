/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class ChatHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  message: string;

  @Column('text', { nullable: true })
  importantPhrase: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne(() => User, (user) => user.chatHistory)
  user: User;
}
