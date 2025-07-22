import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../../common/enums/role.enum";

export class CreateUserDto {
	@ApiProperty({ example: "Izzat" })
	@IsString()
	name: string;

	@ApiProperty({ example: "karimov@gmail.com" })
	@IsEmail()
	email: string;

	@ApiProperty({ example: "aaaa_1221" })
	@IsString()
	password: string;

	@ApiProperty({ enum: Role, example: Role.STUDENT, required: false })
	@IsEnum(Role)
	@IsOptional()
	role?: Role;
}
