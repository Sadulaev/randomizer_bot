import { Event } from "src/event/event.entity"
import { Markup } from "telegraf"

export default (event: Event) => {
    return `
    <em>ID ивента</em> - <b>${event.id}</b>

    <em>Описание:</em>
    <b>${event.description}</b>

    <em>Количество победителей</em> - <b>${event.winners}</b>

    <em>Текущее количество участников</em> - <b>${event.users.length}</b>

    <em>Подписка на канал</em> - <b>${event.subscriptions}</b>

    <em>Статус</em> - <b>${event.status}</b>
    `
} 