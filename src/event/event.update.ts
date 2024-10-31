import { InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Update()
export class EventUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
  ) {}

  @Start()
  async onStart() {}
}
