import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional, IsDateString } from "class-validator";

export class QueryCourseDto {
	@ApiPropertyOptional({
		description: "Filter courses by title (case-insensitive, partial match)",
		example: "Backend",
	})
	@IsOptional()
	@IsString()
	title?: string;

	@ApiPropertyOptional({
		description: "Find courses starting on or after this date (YYYY-MM-DD)",
		example: "2025-08-01",
	})
	@IsOptional()
	@IsDateString()
	startDateAfter?: string;

	@ApiPropertyOptional({
		description: "Find courses starting on or before this date (YYYY-MM-DD)",
		example: "2025-12-31",
	})
	@IsOptional()
	@IsDateString()
	startDateBefore?: string;
}
