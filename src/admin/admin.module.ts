import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminUpdate } from "./admin.update";
import { EventModule } from "src/event/event.module";
import { Event } from "src/event/event.entity";
import { User } from "src/user/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Event, User])],
    providers: [AdminUpdate],
    exports: [AdminModule]
})
export class AdminModule {}