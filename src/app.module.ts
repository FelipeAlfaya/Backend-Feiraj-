import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, CoreModule, UserModule],
})
export class AppModule {}
