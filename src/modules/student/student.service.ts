import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { RegisterStudentDto } from "./dto/create-student.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../user/schemas/user.schema";
import { Model } from "mongoose";
import { hashed } from "../../common/lib/bcrypt";
import { Role } from "../../common/enums";

@Injectable()
export class StudentService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async registerStudent(createStudentDto: RegisterStudentDto): Promise<User> {
		const { email, name, password } = createStudentDto;

		const existingUser = await this.userModel.findOne({ email }).exec();

		if (existingUser) {
			if (existingUser.role == Role.USER) {
				existingUser.role = Role.STUDENT;

				const hashedPassword = await hashed(password);

				existingUser.password = hashedPassword;

				existingUser.name = name;

				return existingUser.save();
			}

			throw new BadRequestException("Student already exist with this email");
		}

		const hashedPassword = await hashed(password);
		const newUser = new this.userModel({
			email,
			name,
			password: hashedPassword,
			role: Role.STUDENT,
		});

		return newUser.save();
	}

	async getAllCourseStudent(studentId: string, userId: string) {
		if (studentId !== userId) {
			throw new ForbiddenException("You can only access your own courses");
		}
		const student = await this.userModel
			.findById(studentId)
			.populate("registeredCourses")
			.select("name email registeredCourses");

		if (!student) {
			throw new NotFoundException("Student not found");
		}

		return {
			student: {
				id: student._id,
				name: student.name,
				email: student.email,
			},
			registeredCourses: student.registeredCourses,
		};
	}
}
