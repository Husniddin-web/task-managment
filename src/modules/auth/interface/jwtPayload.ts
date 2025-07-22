import { Role } from "../../../common/enums";

export type JwtPayload = {
	id: number;
	email: string;
	role: Role;
};
