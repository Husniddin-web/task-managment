import { Controller, Post, Body, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { Response } from "express";
import { CookieGetter } from "./decorators/cookie-getter.decorator";
import { JwtRefreshTokenGuards } from "./guards/refresh-token.guard";
import { GetCurrentUser } from "../../common/decorators/get-current-user.decorator";
import { SignUpUserDto } from "./dto/signUp.dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("signUp")
	@ApiOperation({ summary: "Register a new user" })
	@ApiResponse({
		status: 201,
		description: "User successfully registered",
	})
	@ApiResponse({ status: 400, description: "Bad request (validation failed)" })
	signUp(@Body() dto: SignUpUserDto) {
		return this.authService.signUp(dto);
	}

	@Post("login")
	@ApiOperation({
		summary: "Login user",
		description: `Use the following credentials for testing admin login:
  
  - **Email**: \`admin@gmail.com\`
  - **Password**: \`admin_mock\`

  - **Email**: \`user@gmail.com\`
  - **Password**: \`user123\`
  
  - **Email**: \`student@gmail.com\`
  - **Password**: \`student123\`
  `,
	})
	@ApiResponse({
		status: 201,
		description: "User successfully logged in",
	})
	@ApiResponse({ status: 400, description: "Bad request (validation failed)" })
	login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
		return this.authService.login(dto, res);
	}

	@UseGuards(JwtRefreshTokenGuards)
	@Post("/refresh/token")
	@ApiOperation({
		summary: "Refresh access token",
		description:
			"Generates a new access token using a valid refresh token sent in the Authorization header.",
	})
	@ApiResponse({
		status: 200,
		description: "Access token refreshed successfully.",
	})
	@ApiResponse({
		status: 401,
		description: "Unauthorized – Invalid or expired refresh token.",
	})
	refreshToken(
		@GetCurrentUser("email") email: string,
		@Res({ passthrough: true }) res: Response,
	) {
		return this.authService.refreshToken(email, res);
	}
}
