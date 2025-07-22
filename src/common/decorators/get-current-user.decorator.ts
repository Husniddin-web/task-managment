import { createParamDecorator, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { JwtPayload } from "../../modules/auth/interface";

export const GetCurrentUser = createParamDecorator(
	(data: keyof JwtPayload, context: ExecutionContext) => {
		const request = context.switchToHttp().getRequest();
		const user = request.user as JwtPayload;

		if (!user) {
			throw new ForbiddenException("Token is invalid");
		}

		if (!data) {
			return user;
		}
		return user[data];
	},
);
