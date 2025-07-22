import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@ApiPropertyOptional({ example: "Jane Doe" })
	@IsString()
	@IsOptional()
	name?: string;

	@ApiPropertyOptional({ example: "jane@example.com" })
	@IsEmail()
	@IsOptional()
	email?: string;

	@ApiPropertyOptional({ example: "newStrongPassword123" })
	@IsString()
	@IsOptional()
	password?: string;
}
