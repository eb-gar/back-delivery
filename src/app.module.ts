import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { RestaurantAdminsModule } from './restaurant-admins/restaurant-admins.module';

@Module({
  imports: [AuthModule, PrismaModule, RestaurantsModule, CloudinaryModule, RestaurantAdminsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
