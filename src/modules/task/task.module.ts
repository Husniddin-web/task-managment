import { Module } from "@nestjs/common";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Task, TaskSchema } from "./schemas/task.schema";
import { JwtStrategy } from "../auth/strategy/jwt.strategy";

@Module({
	imports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])],
	controllers: [TaskController],
	providers: [TaskService, JwtStrategy],
})
export class TaskModule {}
