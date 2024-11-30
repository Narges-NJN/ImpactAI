import { Injectable, OnModuleInit } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';
import { ChatService } from '../chat/chat.service';

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: TelegramBot;

  constructor(
    private readonly configService: ConfigService,
    private readonly chatService: ChatService,
  ) {}

  onModuleInit() {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');

    // Inizializza il bot
    this.bot = new TelegramBot(token, { polling: true });

    // Configura i comandi del bot
    this.bot.onText(/\/start/, (msg) => {
      this.bot.sendMessage(
        msg.chat.id,
        'Benvenuto! Sono il tuo assistente per il diabete. Scrivimi qualsiasi domanda!',
      );
    });

   /* this.bot.on('message', async (msg) => {
      const chatId = msg.chat.id;
      const userMessage = msg.text;

      if (!userMessage.startsWith('/')) {
        // Chiedi al servizio Chat di rispondere
        const response = await this.chatService.handleUserInput(chatId, userMessage);

        // Rispondi con il messaggio generato
        this.bot.sendMessage(chatId, response);
      }
    });*/
  }
}
