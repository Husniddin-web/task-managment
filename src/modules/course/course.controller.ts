import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { CourseService } from "./course.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Auth } from "../auth/decorators/auth.decorator";
import { QueryCourseDto } from "./dto/queryCourse.dto";
import { Role } from "../../common/enums";
import { ValidateObjectIdPipe } from "../../common/pipes/validate-object-id.pipe";
import { GetCurrentUser } from "../../common/decorators/get-current-user.decorator";
import { ObjectId } from "mongoose";

@ApiTags("Course")
@Controller("course")
export class CourseController {
	constructor(private readonly courseService: CourseService) {}

	@Auth(Role.ADMIN)
	@Post()
	@ApiOperation({ summary: "Create a new course (admin-only)" })
	create(@Body() createCourseDto: CreateCourseDto) {
		return this.courseService.create(createCourseDto);
	}

	@Auth(Role.STUDENT)
	@Post(":courseId/register")
	@ApiOperation({ summary: "Enroll Student to course" })
	registerStudentCourse(
		@Param("courseId", ValidateObjectIdPipe) courseId: ObjectId,
		@GetCurrentUser("email") userEmail: string,
	) {
		return this.courseService.enrollCourse(courseId, userEmail);
	}

	@Auth()
	@Get()
	@ApiOperation({ summary: "List all available courses" })
	@ApiResponse({ status: 200, description: "Courses retrieved successfully" })
	findAll(@Query() query: QueryCourseDto) {
		return this.courseService.findAll(query);
	}
}
