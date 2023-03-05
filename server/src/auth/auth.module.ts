import { forwardRef, Module } from "@nestjs/common";
import { UsersModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";


@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
  ],
  exports: [AuthService],
})
export class AuthModule {}
