import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto {
	@ApiProperty({
		example: "example@gmail.com",
		description: "Login email of the user",
	})
	@IsEmail()
	email: string;

	@ApiProperty({
		example: "kadsdax",
		description: "user password",
	})
	@IsString()
	@MinLength(5)
	password: string;
}
