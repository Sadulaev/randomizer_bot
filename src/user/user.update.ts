import { InjectRepository } from "@nestjs/typeorm";
import { Action, Ctx, InjectBot, Update } from "nestjs-telegraf";
import { Event } from "src/event/event.entity";
import { Context, Telegraf } from "telegraf";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UserCallbacks } from "src/enums/callbacks.enum";
import { CustomContext } from "src/types/context";
import callbackToObj from "utils/callbackToObj";

@Update()
export class UserUpdate {
    constructor(
        @InjectBot() private readonly bot: Telegraf<Context>,
        @InjectRepository(Event) private eventRepository: Repository<Event>,
        @InjectRepository(User) private userRepository: Repository<User>
    ) { }

    @Action(new RegExp(UserCallbacks.JoinEvent))
    async joinToEvent(@Ctx() ctx: CustomContext) {
        const params = callbackToObj(ctx.update.callback_query.data) as {
            eventId: string;
        }

        try{
            const eventById = await this.eventRepository.findOne({ where: { id: +params.eventId } });
            const chatMember = await this.bot.telegram.getChatMember(eventById.subscriptions, ctx.update.callback_query.from.id);
            
            const userEvents = await this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.events', 'event')
            .where('user.id = :userId', {userId: chatMember.user.id})
            .getOne();

            console.log(userEvents)

            if(userEvents.events.find(event => event.id === eventById.id)) {
                ctx.answerCbQuery()
                ctx.reply('Вы уже участвуете в розыгрыше')
            } else if(chatMember.status === 'member') {
                userEvents.events.push(eventById);
                this.userRepository.save(userEvents);

                ctx.answerCbQuery()
                ctx.reply(`Теперь вы участник розыгрыша. Новости а также результаты вы можете увидеть в нашем канале - ${eventById.subscriptions}`)
            } else {
                ctx.answerCbQuery()
                ctx.reply(`Чтобы стать участником необходимо быть подписанным на нашу группу - ${eventById.subscriptions}`)
            }
        } catch (err) {
            ctx.reply(`Возникла ошибка на нашей стороное. Мы уже работаем над исправлением. ${err}`)
        }   
    }
}