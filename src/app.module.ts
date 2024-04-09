import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { MarketplaceModule } from './marketplace/marketplace.module';

@Module({
  imports: [
    AuthModule,
    CoreModule,
    UserModule,
    ProductModule,
    MarketplaceModule,
  ],
})
export class AppModule {}
