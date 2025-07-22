import { Module } from "@nestjs/common";
import { CourseService } from "./course.service";
import { CourseController } from "./course.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Course, CourseSchema } from "./schemas/course.schema";
import { JwtStrategy } from "../auth/strategy/jwt.strategy";
import { UserModule } from "../user/user.module";

@Module({
	imports: [MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]), UserModule],
	controllers: [CourseController],
	providers: [CourseService, JwtStrategy],
})
export class CourseModule {}
