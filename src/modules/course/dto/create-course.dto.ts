import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsDateString } from "class-validator";

export class CreateCourseDto {
	@ApiProperty({
		example: "Introduction to Backend Development",
		description: "Title of the course",
	})
	@IsString()
	@IsNotEmpty()
	title: string;

	@ApiProperty({
		example: "This course covers basics of Node.js and Express.",
		description: "Detailed description of the course",
	})
	@IsString()
	@IsNotEmpty()
	description: string;

	@ApiProperty({
		example: "2025-08-01T09:00:00Z",
		description: "Start date of the course in ISO format",
	})
	@IsDateString()
	startDate: Date;

	@ApiProperty({
		example: "2025-12-01T17:00:00Z",
		description: "End date of the course in ISO format",
	})
	@IsDateString()
	endDate: Date;
}
