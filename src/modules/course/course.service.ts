import { white } from "./../../../node_modules/logform/node_modules/@colors/colors/index.d";
import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { Course, CourseDocument } from "./schemas/course.schema";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, ObjectId } from "mongoose";
import { IResponse } from "../../common/types";
import { QueryCourseDto } from "./dto/queryCourse.dto";
import { UserService } from "../user/user.service";

@Injectable()
export class CourseService {
	constructor(
		@InjectModel(Course.name) private courseModel: Model<CourseDocument>,
		private readonly userService: UserService,
	) {}

	async create(createCourseDto: CreateCourseDto) {
		const isExisting = await this.courseModel.findOne({ title: createCourseDto.title });

		if (isExisting) {
			throw new BadRequestException("Course already exist");
		}

		const newCourse = await this.courseModel.create(createCourseDto);

		return {
			message: "Course created successfully",
			statusCode: 201,
			data: newCourse,
		};
	}

	async findAll(queryDto: QueryCourseDto): Promise<Course[]> {
		const query: FilterQuery<CourseDocument> = {};
		const { title, startDateAfter, startDateBefore } = queryDto;

		if (title) {
			query.title = { $regex: title, $options: "i" };
		}

		if (startDateAfter || startDateBefore) {
			query.startDate = {};
			if (startDateAfter) {
				query.startDate.$gte = new Date(startDateAfter);
			}
			if (startDateBefore) {
				query.startDate.$lte = new Date(startDateBefore);
			}
		}

		return this.courseModel.find(query).exec();
	}

	async enrollCourse(courseId: ObjectId, userEmail: string) {
		
		const course = await this.courseModel.findById(courseId);

		if (!course) {
			throw new NotFoundException("Course not found");
		}

		const user = await this.userService.findByEmail(userEmail);

		const isAlreadyEnrolled = user!.registeredCourses.includes(courseId);

		if (isAlreadyEnrolled) {
			throw new ConflictException("User already enrolled in this course");
		}

		user!.registeredCourses.push(courseId);

		await user!.save();

		return { message: "Enrolled successfully" };
	}
}
