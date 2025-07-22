import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { config } from "../../../config";
import { JwtPayload } from "../interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.ACCESS_TOKEN_SECRET_KEY,
			passReqToCallback: true,
		});
	}
	validate(req: Request, payload: JwtPayload): JwtPayload {
		return payload;
	}
}
