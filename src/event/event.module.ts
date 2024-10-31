import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventUpdate } from "./event.update";

@Module({
    imports: [TypeOrmModule.forFeature([Event])],
    providers: [EventUpdate],
    exports: [EventModule]
  })
  export class EventModule { }