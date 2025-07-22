import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterStudentDto {
	@ApiProperty({ example: "Izzat" })
	@IsString()
	name: string;

	@ApiProperty({ example: "karimov@gmail.com" })
	@IsEmail()
	email: string;

	@ApiProperty({ example: "aaaa_1221" })
	@IsString()
	password: string;
}
