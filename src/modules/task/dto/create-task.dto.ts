import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsIn, IsDateString, IsMongoId, IsEnum } from "class-validator";
import { TaskStatus } from "../../../common/enums/taskStatus.enum";

export class CreateTaskDto {
	@ApiProperty({ example: "Write API docs" })
	@IsString()
	@IsNotEmpty()
	title: string;

	@ApiProperty({ example: "Document all endpoints in Swagger" })
	@IsString()
	@IsNotEmpty()
	description: string;

	@ApiProperty({
		example: TaskStatus.PENDING,
		enum: TaskStatus,
		description: "Task status",
		default: TaskStatus.PENDING,
	})
	@IsEnum(TaskStatus)
	status: TaskStatus;

	@ApiProperty({
		example: "2025-08-01T12:00:00Z",
		description: "ISO date string",
	})
	@IsDateString()
	dueDate: Date;
}
