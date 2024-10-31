import { Ctx, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { CustomContext } from './types/context';
import config from './config';
import { adminMainButtons, userMainButton } from './app.buttons';
import { Repository } from 'typeorm';
import { Event } from './event/event.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    @InjectRepository(Event) private eventRepository: Repository<Event>
  ) {}

  @Start()
  async onStart(@Ctx() ctx: CustomContext) {
    if(ctx.chat.id === config().tg.adminId) {
        ctx.reply('Вы админ и можете управлять ботом. Выберите действие', adminMainButtons())
    } else {
        const currentEvents = await this.eventRepository.find({where: {status: 'active'}});

        if(currentEvents.length) {
            currentEvents.forEach((event) => {
                ctx.reply(event.description, userMainButton(event.id))
            })
        } else {
            ctx.reply('На данный момент нет активных розыгрышей. Следите за нашими ресурсами чтобы не пропустить. И бла бла бла...')
        }
    }
  }
}
