import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { config } from "../../../config";
import { JwtPayload } from "../interface";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, "refresh-jwt") {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => {
					if (req && req.cookies) {
						return req.cookies["refresh_token"];
					}
					return null;
				},
			]),
			secretOrKey: config.REFRESH_TOKEN_SECRET_KEY,
			passReqToCallback: false, // no need to pass req to validate unless needed
		});
	}

	validate(payload: JwtPayload): JwtPayload {
		return payload; // attach user info to request.user
	}
}
