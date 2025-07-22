import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional, IsEnum, IsDateString } from "class-validator";
import { TaskStatus } from "../../../common/enums/taskStatus.enum";

export class QueryTaskDto {
	@ApiPropertyOptional({
		description: "Filter tasks by title (case-insensitive, partial match)",
		example: "docs",
	})
	@IsOptional()
	@IsString()
	title?: string;

	@ApiPropertyOptional({
		description: "Filter tasks by status",
		enum: TaskStatus,
		example: TaskStatus.IN_PROGRESS,
	})
	@IsOptional()
	@IsEnum(TaskStatus)
	status?: TaskStatus;

	@ApiPropertyOptional({
		description: "Filter tasks by due date (YYYY-MM-DD)",
		example: "2025-08-01",
	})
	@IsOptional()
	@IsDateString()
	dueDate?: string;
}
