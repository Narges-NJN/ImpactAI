import { Injectable, OnModuleInit } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';
import { ChatService } from '../chat/chat.service';
import { selectButtons } from './selectButtons';
import { MemoryPhraseService } from '../chat/memory-phrase.service';

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: TelegramBot;

  // Memorizza la cronologia delle domande e risposte per ogni chat
  private chatHistory: { [chatId: string]: { question: string; answer: string }[] } = {};

  constructor(
    private readonly configService: ConfigService,
    private readonly chatService: ChatService, 
    private readonly memoryPhraseService: MemoryPhraseService
  ) {}


  private async sendMemoryPage(chatId: string, memoryPhrases: string[], page: number): Promise<void> {
    const itemsPerPage = 5;
    const totalPages = Math.ceil(memoryPhrases.length / itemsPerPage);
  
    // Calcola gli indici degli elementi da mostrare in questa pagina
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, memoryPhrases.length);
  
    // Crea il testo del messaggio con i numeretti
    const pageContent = memoryPhrases.slice(startIndex, endIndex)
      .map((phrase, index) => `${startIndex + index + 1}. ${phrase}`)
      .join('\n');
  
    // Crea i pulsanti
    const inlineKeyboard = memoryPhrases.slice(startIndex, endIndex).map((_, index) => [
      {
        text: `🗑️ Remove ${startIndex + index + 1}`,
        callback_data: `remove_${startIndex + index}`, // Callback per rimuovere
      },
    ]);
  
    // Aggiungi i pulsanti di navigazione
    if (page > 1) {
      inlineKeyboard.push([{ text: '⬅️ Previous', callback_data: `page_${page - 1}` }]);
    }
    if (page < totalPages) {
      inlineKeyboard.push([{ text: '➡️ Next', callback_data: `page_${page + 1}` }]);
    }
  
    // Invia il messaggio
    await this.bot.sendMessage(chatId, `📄 <b>Memory (Page ${page}/${totalPages}):</b>\n${pageContent}`, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: inlineKeyboard,
      },
    });
  }
  

  onModuleInit() {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');

    // Inizializza il bot
    this.bot = new TelegramBot(token, { polling: true });

    this.bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      const userName = msg.from?.first_name || 'utente'; // Prendi il nome dell'utente, se disponibile
    
      const welcomeMessage = `Hi ${userName}! 👋\n\n🎉 <b>Welcome to your Diabetes Assistant</b> 🎉\n\nI can help you with:\n- 🍎 Nutrition advice to keep your sugar levels under control.\n- 📈 Useful information to better manage your health.\n- ❓ Answers to your questions about food, habits, and much more!\n\nStart right away by asking me a question, for example:\n👉 "<code>What can I eat for breakfast to keep my sugar levels low?</code>"\n\n💾 You can also use the /memory command to view the phrases you've saved in your memory, navigate them using pages, and even remove items you no longer need.\n\nI’m here to help you! 😊`;
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

    this.bot.onText(/\/memory/, async (msg) => {
      const chatId = msg.chat.id;
    
      try {
        // Recupera le frasi salvate per l'utente
        const memoryPhrases = await this.memoryPhraseService.getPhrases(chatId.toString());
    
        if (!memoryPhrases.length) {
          await this.bot.sendMessage(chatId, '📂 Your memory is empty.');
          return;
        }
    
        // Mostra la prima pagina
        await this.sendMemoryPage(chatId, memoryPhrases, 1);
      } catch (error) {
        console.error('Errore durante il recupero delle frasi:', error);
        await this.bot.sendMessage(chatId, '⚠️ An error occurred while retrieving your memory.');
      }
    });    


    this.bot.on('callback_query', async (callbackQuery) => {
      const chatId = callbackQuery.message.chat.id;
      const data = callbackQuery.data;
    
      try {
        const memoryPhrases = await this.memoryPhraseService.getPhrases(chatId.toString());
    
        if (data.startsWith('page_')) {
          // Navigazione tra le pagine
          const page = parseInt(data.split('_')[1], 10);
          await this.sendMemoryPage(chatId, memoryPhrases, page);
        } else if (data.startsWith('remove_')) {
          // Rimozione di una frase
          const index = parseInt(data.split('_')[1], 10);
    
          if (index >= 0 && index < memoryPhrases.length) {
            const phraseToRemove = memoryPhrases[index];
    
            // Rimuovi la frase dalla memoria
            await this.memoryPhraseService.removePhrase(chatId.toString(), phraseToRemove);
    
            // Aggiorna la lista e torna alla prima pagina
            const updatedPhrases = await this.memoryPhraseService.getPhrases(chatId.toString());
            if (updatedPhrases.length === 0) {
              await this.bot.sendMessage(chatId, '📂 Your memory is now empty.');
            } else {
              await this.sendMemoryPage(chatId, updatedPhrases, 1);
            }
          }
        }
    
        // Conferma la callback
        await this.bot.answerCallbackQuery(callbackQuery.id);
      } catch (error) {
        console.error('Errore durante la gestione della callback:', error);
        await this.bot.sendMessage(chatId, '⚠️ An error occurred.');
      }
    });
    
    

    // Gestione dei messaggi
    this.bot.on('message', async (msg) => {
      const chatId = msg.chat.id;
      const userMessage = msg.text;
      const userName = msg.from?.first_name || 'utente'; // Prendi il nome dell'utente, se disponibile
    
      // Evita di rispondere ai comandi come /start
      if (!userMessage.startsWith('/')) {
        try {
          // Invia un messaggio di attesa...
          const sentMessage = await this.bot.sendMessage(chatId, '🚀');
    
          await this.bot.sendChatAction(chatId, 'typing');

          // Recupera le frasi salvate per l'utente
          const memoryPhrases = await this.memoryPhraseService.getPhrases(chatId.toString());

          // Prepara il contesto delle frasi per il prompt
          const memoryContext = memoryPhrases.length
            ? `\nFrasi salvate:\n${memoryPhrases.join('\n')}`
            : '\nNon ci sono frasi salvate per questo utente.';
    
          // Ottieni la risposta dal servizio ChatService
          const response = await this.chatService.handleUserInput(userMessage, {
            name: userName,
            history: this.chatHistory[chatId] || [], // Passa la cronologia come array vuoto se non esiste
            memory: memoryContext
          });
    
          // Supponiamo che la risposta del ChatService sia un JSON come quello fornito
          const parsedResponse = JSON.parse(response);
    
          // Estrai i dati dal JSON
          const replyMsg = parsedResponse.replyMsg;
          const buttons = parsedResponse.buttons || [];
          const saveMemory = parsedResponse.memory?.saveMemory === 'true'; // Determina se salvare nella cronologia
          const msgMemory = parsedResponse.memory?.msgMemory;

          if (saveMemory && msgMemory) {
            await this.memoryPhraseService.addPhrase(chatId.toString(), msgMemory);
          }
    
          // Salva nella cronologia solo se specificato
          if (saveMemory && msgMemory) {
            if (!this.chatHistory[chatId]) {
              this.chatHistory[chatId] = [];
            }
            this.chatHistory[chatId].push({ question: userMessage, answer: msgMemory });
    
            // Mantieni solo le ultime 10 interazioni
            if (this.chatHistory[chatId].length > 10) {
              this.chatHistory[chatId].shift();
            }
          }
    
          // Configura la tastiera dinamica dai pulsanti del JSON
          const keyboard = {
            reply_markup: {
              keyboard: buttons.reduce((rows, button, index) => {
                if (index % 2 === 0) {
                  rows.push([button]); // Aggiungi una nuova riga con il pulsante
                } else {
                  rows[rows.length - 1].push(button); // Aggiungi il pulsante alla riga esistente
                }
                return rows;
              }, []),
              resize_keyboard: true,
              one_time_keyboard: false,
            },
          };
    
          // Elimina il messaggio di attesa
          await this.bot.deleteMessage(chatId, sentMessage.message_id.toString());
    
          // Invia un nuovo messaggio con la risposta e i pulsanti
          await this.bot.sendMessage(chatId, replyMsg, {
            ...keyboard,
            parse_mode: 'HTML', // Assumi che il messaggio sia in HTML
          });
        } catch (error) {
          console.error('Errore nella generazione della risposta:', error);
          this.bot.sendMessage(chatId, '⚠️⚠️⚠️ An error has occurred. Please try again later.');
        }
      }
    });      
  }
}
