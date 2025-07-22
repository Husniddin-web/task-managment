import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { TokenExpiredError } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Passport } from "passport";

@Injectable()
export class JwtRefreshTokenGuards extends AuthGuard("refresh-jwt") {
	handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
		if (info instanceof TokenExpiredError) {
			throw new UnauthorizedException("JWT token has expired!");
		}

		if (err || !user) {
			throw new UnauthorizedException("Invalid or missing JWT token");
		}

		return user;
	}
}
