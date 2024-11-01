import { Context as TelegrafContext } from 'telegraf';

// Расширение типа контекста Telegraf для поддержки сессий
export interface CustomContext extends TelegrafContext {
  update: TelegrafContext['update'] & { 
    callback_query?: { 
      from?: {
        id: number,
        is_bot: boolean,
        first_name: string,
        last_name: string,
        username: string,
        language_code: string
      },
      data: string
    }, 
    message?: {
      from: {
        id: number,
        is_bot: boolean,
        first_name: string,
        last_name: string,
        username: string,
        language_code: string
      },
      chat: {
        id: number,
        first_name: string,
        last_name: string,
        username: string,
        type: string
      },
    } };
  message: TelegrafContext['message'] & { text: string };
  session: { [key: string]: any | any[] }; // Добавляем поле session с типом SessionData
}
