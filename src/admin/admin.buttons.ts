import { AdminCallbacks } from "src/enums/callbacks.enum"
import { Markup } from "telegraf"

export const saveOrSendEventButtons = (eventId: number) => {
    return Markup.inlineKeyboard([
            Markup.button.callback('Активировать ивент сразу', `${AdminCallbacks.FinishAndSend}&eventId-${eventId}`),
            Markup.button.callback('Активировать ивент сразу', AdminCallbacks.FinishAndSave)
        ])
}