import { Injectable, OnModuleInit } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';
import { ChatService } from '../chat/chat.service';
import { selectButtons } from './selectButtons';

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: TelegramBot;

  // Memorizza la cronologia delle domande e risposte per ogni chat
  private chatHistory: { [chatId: string]: { question: string; answer: string }[] } = {};

  constructor(
    private readonly configService: ConfigService,
    private readonly chatService: ChatService, // Inietta ChatService
  ) {}

  onModuleInit() {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');

    // Inizializza il bot
    this.bot = new TelegramBot(token, { polling: true });

    this.bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      const userName = msg.from?.first_name || 'utente'; // Prendi il nome dell'utente, se disponibile
    
      const welcomeMessage = `Hi ${userName}! 👋\n\n🎉 <b>Welcome to your Diabetes Assistant</b> 🎉\n\nI can help you with:\n- 🍎 Nutrition advice to keep your sugar levels under control.\n- 📈 Useful information to better manage your health.\n- ❓ Answers to your questions about food, habits, and much more!\n\nStart right away by asking me a question, for example:\n👉 "<code>What can I eat for breakfast to keep my sugar levels low?</code>"\n\nI’m here to help you! 😊`;
      const keyboard = {
        reply_markup: {
          keyboard: selectButtons(), 
          resize_keyboard: true,
          one_time_keyboard: false,
        },
      };

      this.bot.sendMessage(chatId, welcomeMessage, {
        ...keyboard,
        parse_mode: 'HTML', 
      });    


      // Messaggio per i partner
      const partnerMessage = `
      🔗 <b>Our Partners:</b>

      We collaborate with innovative companies and leaders in artificial intelligence to provide the best solutions to our users. Learn more about our partners and their incredible technologies:

      🎉 <b>LABLAB</b>: A unique platform organizing hackathons focused on artificial intelligence, connecting developers, innovators, and creatives from all over the world. Join their events to challenge yourself and develop extraordinary ideas.

      🐝 <b>API AI/ML</b>: Provides advanced artificial intelligence APIs, ideal for developing smart solutions easily and at scale.

      🦙 <b>LLAMA</b>: A leader in generative AI, offering cutting-edge language models designed to deliver personalized and high-performing experiences.

      Click the links below to learn more about our partners! 🚀
      `;


      const partnerKeyboard = {
        reply_markup: {
          inline_keyboard: [
            [
              { text: '🎉 LABLAB 🎉', url: 'https://lablab.ai/event/' },
              { text: '🐝 API AI/ML 🐝', url: 'https://aimlapi.com/' },
              { text: '🦙 LLAMA 🦙', url: 'https://www.llama.com/' },
            ],
          ],
        },
      };


      // Invia il messaggio dei partner con pulsanti
      this.bot.sendMessage(chatId, partnerMessage, {
        ...partnerKeyboard,
        parse_mode: 'HTML',
      });

    });
    

    // Gestione dei messaggi
    this.bot.on('message', async (msg) => {
      const chatId = msg.chat.id;
      const userMessage = msg.text;
      const userName = msg.from?.first_name || 'utente'; // Prendi il nome dell'utente, se disponibile
    
      // Evita di rispondere ai comandi come /start
      if (!userMessage.startsWith('/')) {
        try {    
          // Invia un messaggio iniziale "In attesa..."
          const sentMessage = await this.bot.sendMessage(chatId, '🚀');
      
          const keyboard = {
            reply_markup: {
              keyboard: selectButtons(), 
              resize_keyboard: true,
              one_time_keyboard: false,
            },
          };
      
          await this.bot.sendChatAction(chatId, 'typing');
          
          // Ottieni la risposta dal servizio ChatService
          const response = await this.chatService.handleUserInput(userMessage, {
            name: userName,
            history: this.chatHistory[chatId] || [], // Passa la cronologia come array vuoto se non esiste
          });
          

          // Salva la domanda e risposta nella cronologia
          if (!this.chatHistory[chatId]) {
            this.chatHistory[chatId] = [];
          }
          this.chatHistory[chatId].push({ question: userMessage, answer: response });

          // Mantieni solo le ultime 10 interazioni
          if (this.chatHistory[chatId].length > 10) {
            this.chatHistory[chatId].shift();
          }
      
          // Elimina il messaggio "In attesa..."
          await this.bot.deleteMessage(chatId, sentMessage.message_id.toString());
      
          // Invia un nuovo messaggio con la risposta
          await this.bot.sendMessage(chatId, response, {
            ...keyboard,
            parse_mode: 'HTML',
          });
        } catch (error) {
          console.error('Errore nella generazione della risposta:', error);
          this.bot.sendMessage(chatId, '⚠️⚠️⚠️ An error has occurred. Please try again later.');
        }
      }      
    });    
  }
}
