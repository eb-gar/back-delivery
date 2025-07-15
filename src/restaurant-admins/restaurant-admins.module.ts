import { Module } from '@nestjs/common';
import { RestaurantAdminsService } from './restaurant-admins.service';
import { RestaurantAdminsController } from './restaurant-admins.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [RestaurantAdminsController],
  providers: [RestaurantAdminsService],
})
export class RestaurantAdminsModule {}
