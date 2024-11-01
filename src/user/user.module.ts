import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserUpdate } from "./user.update";
import { Event } from "src/event/event.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User, Event])],
    providers: [UserUpdate],
    exports: [UserModule]
})
export class UserModule {}