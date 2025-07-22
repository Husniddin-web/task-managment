import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../decorators/role.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		private readonly reflector: Reflector,
	) {}
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		// get all roles
		const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		// agar role yoq bolda
		if (!requiredRoles.length) {
			return true;
		}

		const req = context.switchToHttp().getRequest();

		const permission = requiredRoles.includes(req.user.role);
		// check role permisson
		if (!permission) {
			throw new ForbiddenException();
		}

		return true;
	}
}
