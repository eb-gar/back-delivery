import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { RestaurantAdminsModule } from './restaurant-admins/restaurant-admins.module';
import { DishesModule } from './dishes/dishes.module';
import { OrdersModule } from './orders/orders.module';
import { ClientAuthModule } from './client-auth/client-auth.module';

@Module({
  imports: [AuthModule, PrismaModule, RestaurantsModule, CloudinaryModule, RestaurantAdminsModule, DishesModule, OrdersModule, ClientAuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
