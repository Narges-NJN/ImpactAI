import { Injectable, OnModuleInit } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';
import { ChatService } from '../chat/chat.service';
import { selectButtons } from './selectButtons';

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: TelegramBot;

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
    
      const welcomeMessage = `Ciao ${userName}! 👋\n\n🎉 <b>Benvenuto nel tuo assistente per il diabete</b> 🎉\n\nPosso aiutarti con:\n- 🍎 Consigli sull'alimentazione per mantenere i livelli di zucchero sotto controllo.\n- 📈 Informazioni utili per gestire meglio la tua salute.\n- ❓ Risposte alle tue domande su cibi, abitudini e tanto altro!\n\nInizia subito scrivendomi una domanda, ad esempio:\n👉 "<code>Cosa posso mangiare a colazione per mantenere bassi gli zuccheri?</code>"\n\nSono qui per aiutarti! 😊`;
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
      🔗 <b>I nostri partner:</b>

      Collaboriamo con aziende innovative e leader nel settore dell'intelligenza artificiale per offrire le migliori soluzioni ai nostri utenti. Scopri di più sui nostri partner e sulle loro incredibili tecnologie:

      🎉 <b>LABLAB</b>: Una piattaforma unica che organizza hackathon dedicati all'intelligenza artificiale, mettendo in contatto sviluppatori, innovatori e creativi da tutto il mondo. Partecipa ai loro eventi per metterti alla prova e sviluppare idee straordinarie.

      🐝 <b>API AI/ML</b>: Fornisce API avanzate di intelligenza artificiale, ideali per sviluppare soluzioni intelligenti in modo semplice e scalabile.

      🦙 <b>LLAMA</b>: Leader nell'AI generativa, con modelli di linguaggio all'avanguardia progettati per offrire esperienze personalizzate e performanti.

      Clicca sui link qui sotto per scoprire di più sui nostri partner! 🚀
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
          const sentMessage = await this.bot.sendMessage(chatId, '🚀 In attesa...');
          await this.bot.sendChatAction(chatId, 'typing');
          
          // Ottieni la risposta dal servizio ChatService
          const response = await this.chatService.handleUserInput(userMessage, {
            name: userName,
          });
    
          // Modifica il messaggio "In attesa..." con la risposta
          await this.bot.editMessageText(response, {
            chat_id: chatId,
            message_id: sentMessage.message_id, // ID del messaggio da modificare
            parse_mode: 'HTML', // Mantieni la formattazione HTML
          });
        } catch (error) {
          console.error('Errore nella generazione della risposta:', error);
          this.bot.sendMessage(chatId, 'Si è verificato un errore. Riprova più tardi.');
        }
      }
    });    
  }
}
