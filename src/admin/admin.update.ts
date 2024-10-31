import { InjectRepository } from "@nestjs/typeorm";
import { Action, Ctx, InjectBot, On, Update } from "nestjs-telegraf";
import { AdminCallbacks } from "src/enums/callbacks.enum";
import { Event } from "src/event/event.entity";
import { CustomContext } from "src/types/context";
import { Context, Telegraf } from "telegraf";
import { callback } from "telegraf/typings/button";
import { Repository } from "typeorm";
import callbackToObj from "utils/callbackToObj";
import { saveOrSendEventButtons } from "./admin.buttons";
import { adminMainButtons, userMainButton } from "src/app.buttons";
import { User } from "src/user/user.entity";

@Update()
export class AdminUpdate {
    constructor(
        @InjectBot() private readonly bot: Telegraf<Context>,
        @InjectRepository(Event) private eventRepository: Repository<Event>,
        @InjectRepository(User) private userRepository: Repository<User>

    ) {}

    @Action(AdminCallbacks.CreateEvent)
    async createEvent (@Ctx() ctx: CustomContext) {
        if (!ctx.session?.createEventInfo) {
            ctx.session = {
                ...ctx.session,
                createEventInfo: {
                    step: 'description',
                    winners: null,
                    subscriptions: [],
                    endTime: null,
                }
            }

            ctx.reply('Введите описание ивента')
        } else {
            ctx.session
            ctx.reply('Недостижимый код номер один. Как ты сюда попал? (001)')
        }
    }

    @On('text') 
    async onCreatingEvent(@Ctx() ctx: CustomContext) {
        if(ctx.session?.createEventInfo?.step === 'description') {
            ctx.session.createEventInfo.description = ctx.message.text;
            ctx.session.createEventInfo.step = 'winners'

            ctx.reply('Введите количество победителей в ивенте')
        } else if (ctx.session?.createEventInfo?.step === 'winners') {
            ctx.session.createEventInfo.winners = ctx.message.text;
            ctx.session.createEventInfo.step = 'subscriptions';

            ctx.reply('Введите группы на которые необходимо подписаться чтобы учавствовать в ивенте. Пришлите в виде - @id_группы/@id_другой_группы/...')
        } else if (ctx.session?.createEventInfo?.step === 'subscriptions') {
            ctx.session.createEventInfo.subscriptions = ctx.message.text;
            ctx.session.createEventInfo.step = 'endTime';

            ctx.reply('Введите время окончания в формате дд.мм.гггг (или точку если не нужно указывать)')
        } else if (ctx.session?.createEventInfo?.step === 'endTime') {
            ctx.session.createEventInfo.endTime = ctx.message.text === '.' ? null : ctx.message.text;

            const newEvent = new Event();
            newEvent.description = ctx.session.createEventInfo.description;
            newEvent.winners = +ctx.session.createEventInfo.winners;
            newEvent.subscriptions = ctx.session.createEventInfo.subscriptions;
            newEvent.endtime = ctx.session.createEventInfo.endTime;

            try {
                const result = await this.eventRepository.save(newEvent)
                if(result) {
                    ctx.reply('Ивент был успешно создан', saveOrSendEventButtons(result.id))
                } else {
                    ctx.reply('Произошла ошибка которая не могла произойти. Серьезно до этого шага дойти почти невозможно')
                }
            } catch (err) {
                ctx.reply(`Возникла следующая ошибка: ${err}. \n Покажите программисту`)
            }
        }
    }

    @Action(AdminCallbacks.FinishAndSave)
    async saveNewEvent (@Ctx() ctx: CustomContext) {
        ctx.reply('Новый ивент сохранен. Выберите дальнейшие действия', adminMainButtons())
    }

    @Action(new RegExp(AdminCallbacks.FinishAndSend))
    async sendNewEvent (@Ctx() ctx: CustomContext) {
        const params = callbackToObj(ctx.update.callback_query.data) as {
            eventId: string;
        }

        const eventById = await this.eventRepository.findOne({where: {id: +params.eventId}})
        const allUsers = await this.userRepository.find({select: {id: true}});

        if(eventById) {
            allUsers.forEach(({id}) => {
                this.bot.telegram.sendMessage(id, eventById.description, userMainButton(eventById.id))
            })
        } else {
            ctx.reply('Ивент не найден, проверьте список ивентов!')
        }
    }
}