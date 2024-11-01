import { Command, Ctx, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { CustomContext } from './types/context';
import config from './config';
import { adminMainButtons, userMainButton } from './app.buttons';
import { Repository } from 'typeorm';
import { Event } from './event/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { EventStatus } from './enums/event.enum';

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }

  @Start()
  async onStart(@Ctx() ctx: CustomContext) {

    this.bot.telegram.callApi('setMyCommands', {
      commands: [{ command: '/reset', description: 'Сбросить сессию' }],
      scope: {type: 'chat', chat_id: config().tg.adminId}
    });

    if (ctx.chat.id === config().tg.adminId) {
      ctx.reply('Вы админ и можете управлять ботом. Выберите действие', adminMainButtons())
    } else {
      const userFromDB = await this.userRepository.findOne({ where: { id: ctx.update.message.chat.id } })

      if (!userFromDB) {
        const newUser = new User();

        newUser.id = ctx.update.message.from.id;
        newUser.firstName = ctx.update.message.from.first_name;
        newUser.lastName = ctx.update.message.from.last_name;
        newUser.username = ctx.update.message.from.username;

        console.log(newUser)

        await this.userRepository.save(newUser);
      }

      const currentEvents = await this.eventRepository.find({ where: { status: EventStatus.Active } });

      if (currentEvents.length) {
        currentEvents.forEach((event) => {
          ctx.reply(event.description, userMainButton(event.id))
        })
      } else {
        ctx.reply('На данный момент нет активных розыгрышей. Следите за нашими ресурсами чтобы не пропустить. И бла бла бла...')
      }
    }
  }

  @Command('reset')
  async resetSession(@Ctx() ctx: CustomContext) {
    ctx.session = {};
    this.onStart(ctx);
  }
}
