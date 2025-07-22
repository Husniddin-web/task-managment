import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { config } from "../../config";
import { JwtPayload } from "./interface";
import { User } from "../user/schemas/user.schema";
import { IResponse } from "../../common/types";
import { LoginDto } from "./dto/login.dto";
import { Response } from "express";
import { compare, hashed } from "../../common/lib/bcrypt";
import { SignUpUserDto } from "./dto/signUp.dto";

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private userService: UserService,
	) {}

	// generate token
	async generateTokens(payload: JwtPayload) {
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(payload, {
				secret: config.ACCESS_TOKEN_SECRET_KEY,
				expiresIn: config.ACCESS_TOKEN_LIFE_TIME,
			}),
			this.jwtService.signAsync(payload, {
				secret: config.REFRESH_TOKEN_SECRET_KEY,
				expiresIn: config.REFRESH_TOKEN_LIFE_TIME,
			}),
		]);

		return {
			accessToken,
			refreshToken,
		};
	}

	async signUp(dto: SignUpUserDto): Promise<IResponse<User>> {
		
		const { email, name, password } = dto;

		// check user is exist or not
		const isExisting = await this.userService.findByEmail(email);

		if (isExisting) {
			throw new ConflictException("This email is already registered.");
		}

		// hashing password
		const hashedPassword = await hashed(password);

		// creating user
		const newUser = await this.userService.create({ name, email, password: hashedPassword });

		return {
			message: "Created successfully!",
			data: newUser,
			statusCode: 201,
		};
	}

	// login
	async login(loginDto: LoginDto, res: Response) {
		const { email, password } = loginDto;

		const user = await this.userService.findByEmail(email);

		if (!user) {
			throw new BadRequestException("Invalid email or password");
		}

		const isMatch = await compare(password, user.password);

		if (!isMatch) {
			throw new BadRequestException("Invalid email or password");
		}

		const { accessToken, refreshToken } = await this.generateTokens({
			id: user.id,
			role: user.role,
			email: user.email,
		});

		res.cookie("refresh_token", refreshToken, {
			maxAge: 15 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});

		return {
			message: "Successfully logged in",
			statusCode: 200,
			data: {
				accessToken,
				user: {
					id: user.id,
					name: user.name,
					role: user.role,
				},
			},
		};
	}

	async refreshToken(email: string, res: Response) {
		const user = await this.userService.findByEmail(email);

		if (!user) {
			throw new NotFoundException("User not found with this email");
		}

		const { accessToken, refreshToken } = await this.generateTokens({
			id: user.id,
			email: user.email,
			role: user.role,
		});

		res.cookie("refresh_token", refreshToken, {
			httpOnly: true,
			maxAge: 15 * 24 * 60 * 60 * 1000,
		});

		return {
			message: "Access token refreshed successfully.",
			data: {
				accessToken,
			},
			statusCode: 200,
		};
	}
}
