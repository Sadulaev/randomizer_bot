import { Markup } from "telegraf"
import { AdminCallbacks, UserCallbacks } from "./enums/callbacks.enum"

export const adminMainButtons = () => {
    return Markup.inlineKeyboard([
        Markup.button.callback('Создать новый ивент', AdminCallbacks.CreateEvent),
        Markup.button.callback('Список текущих ивентов', AdminCallbacks.GetAllEvents),
    ], {columns: 1})
}

export const userMainButton = (eventId: number) => {
    return Markup.inlineKeyboard([
        Markup.button.callback('Учавствовать в розыгрыше', `${UserCallbacks.JoinEvent}&eventId-${eventId}`),
    ])
}