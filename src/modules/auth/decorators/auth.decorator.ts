import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { ROLES_KEY } from "./role.decorator";
import { JwtAuthGuards } from "../guards/jwt.guard";
import { RolesGuard } from "../guards/role.guard";
import { Role } from "../../../common/enums";

export function Auth(...roles: Role[]) {
	return applyDecorators(
		SetMetadata(ROLES_KEY, roles),
		UseGuards(JwtAuthGuards, RolesGuard),
		ApiBearerAuth(),
		ApiUnauthorizedResponse({ description: "Unauthorized" }),
		ApiBadRequestResponse({ description: "Bad Request" }),
		ApiOkResponse({ description: "OK" }),
		ApiForbiddenResponse({ description: "Forbidden resource" }),
	);
}
