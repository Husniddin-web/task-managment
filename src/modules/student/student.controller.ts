import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { StudentService } from "./student.service";
import { RegisterStudentDto } from "./dto/create-student.dto";
import { Auth } from "../auth/decorators/auth.decorator";
import { Role } from "../../common/enums";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { GetCurrentUser } from "../../common/decorators/get-current-user.decorator";

@ApiTags("Students")
@Controller("student")
export class StudentController {
	constructor(private readonly studentService: StudentService) {}

	@Post("register")
	@ApiOperation({ summary: "Register a student " })
	@ApiResponse({ status: 201, description: "Student registered successfully by admin" })
	@ApiResponse({ status: 400, description: "Validation failed or student already exists" })
	create(@Body() createStudentDto: RegisterStudentDto) {
		return this.studentService.registerStudent(createStudentDto);
	}

	@Get(":id/courses")
	@Auth(Role.STUDENT)
	@ApiOperation({ summary: "Get all courses of a student" })
	@ApiParam({ name: "id", description: "Student ID (MongoDB ObjectId)" })
	@ApiResponse({ status: 200, description: "List of student’s enrolled courses" })
	@ApiResponse({ status: 404, description: "Student not found" })
	getAllCourseStudent(@Param("id") id: string, @GetCurrentUser("id") userId: string) {
		return this.studentService.getAllCourseStudent(id, userId);
	}
}
