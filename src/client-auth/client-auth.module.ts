import { Module } from '@nestjs/common';
import { ClientAuthController } from './client-auth.controller';
import { ClientAuthService } from './client-auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [
    JwtModule.register({ 
      secret: process.env.JWT_SECRET, 
      signOptions: { expiresIn: '1d' } 
    }),
    OrdersModule
  ],
  controllers: [ClientAuthController],
  providers: [ClientAuthService, PrismaService],
})
export class ClientAuthModule {}