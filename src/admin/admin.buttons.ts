import { AdminCallbacks } from "src/enums/callbacks.enum"
import { EventStatus } from "src/enums/event.enum"
import { Event } from "src/event/event.entity"
import { Markup } from "telegraf"
import { inlineKeyboard } from "telegraf/typings/markup"

export const saveOrSendEventButtons = (eventId: number) => {
    return Markup.inlineKeyboard([
        Markup.button.callback('Активировать ивент сразу', `${AdminCallbacks.FinishAndSend}&eventId-${eventId}`),
        Markup.button.callback('Активировать ивент позже', AdminCallbacks.FinishAndSave)
    ])
}

export const getAllEventsButtons = (events: Event[]) => {
    return Markup.inlineKeyboard(
        events.map((event) => Markup.button.callback(`${event.description.slice(0, 25)}...`, `${AdminCallbacks.GetEventById}&eventId-${event.id}`)
        ), { columns: 1 })
}

export const eventControlButtons = (event: Event) => {
    if(event.status === EventStatus.InProgress) {
        return [
            [{ text: 'Подвести итоги', callback_data: `${AdminCallbacks.FinalizeEvent}&eventId-${event.id}` }],
            [{ text: 'Активировать ивент', callback_data: `${AdminCallbacks.ActivateEvent}&eventId-${event.id}` }],
            [{ text: 'Удалить ивент (не рекомендуется)', callback_data: `${AdminCallbacks.DeleteEvent}&eventId-${event.id}` }]
        ]
    } else {
        return [
            [{ text: 'Подвести итоги', callback_data: `${AdminCallbacks.FinalizeEvent}&eventId-${event.id}` }],
            [{ text: 'Удалить ивент (не рекомендуется)', callback_data: `${AdminCallbacks.DeleteEvent}&eventId-${event.id}` }]
        ]
    }
    
}

export const confirmDeleteEventButtons = (eventId: string) => {
    return Markup.inlineKeyboard([
        Markup.button.callback('Да уверен', `${AdminCallbacks.DeleteEvent}&eventId-${eventId}`),
    ])
}