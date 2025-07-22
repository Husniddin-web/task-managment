import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { WinstonModule } from "nest-winston";
import { winstonConfig } from "./common/lib/logger";
import { MongooseModule } from "@nestjs/mongoose";
import { config } from "./config";
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';
import { AuthModule } from './modules/auth/auth.module';
import { CourseModule } from './modules/course/course.module';
import { StudentModule } from './modules/student/student.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		WinstonModule.forRoot(winstonConfig),
		MongooseModule.forRoot(config.DB_URL),
		UserModule,
		TaskModule,
		AuthModule,
		CourseModule,
		StudentModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
