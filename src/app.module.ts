import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as LocalSession from 'telegraf-session-local';
import config from './config';
import { TelegrafModule } from 'nestjs-telegraf';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AppUpdate } from './app.update';
import { Event } from './event/event.entity';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';

const sessions = new LocalSession({ database: 'session_db.json' });

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    TelegrafModule.forRoot({
      middlewares: [sessions.middleware()],
      token: config().tg.token,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config().database.host,
      port: config().database.port,
      username: config().database.username,
      password: config().database.password,
      database: config().database.database,
      entities: [Event, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Event, User]),
    AdminModule,
    UserModule
  ],
  providers: [AppUpdate]
})
export class AppModule { }
