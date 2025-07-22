import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { RefreshJwtStrategy } from "./strategy/refresh-token.strategy";

@Module({
	imports: [JwtModule.register({ global: true }), UserModule],
	controllers: [AuthController],
	providers: [AuthService, RefreshJwtStrategy],
})
export class AuthModule {}
