import { Module } from "@nestjs/common";
import { StudentService } from "./student.service";
import { StudentController } from "./student.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../user/schemas/user.schema";
import { JwtStrategy } from "../auth/strategy/jwt.strategy";
import { UserModule } from "../user/user.module";

@Module({
	imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), UserModule],
	controllers: [StudentController],
	providers: [StudentService, JwtStrategy],
})
export class StudentModule {}
