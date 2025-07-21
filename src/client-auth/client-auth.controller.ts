import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { CreateOrderDto } from '../orders/dto/create-order.dto';
import { ClientAuthService } from './client-auth.service';

@Controller('client-auth')
export class ClientAuthController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly clientAuthService: ClientAuthService,
  ) {}

  @Post('register')
  register(@Body() dto: { name: string; email: string; password: string; restaurantId: number }) {
    return this.clientAuthService.register(dto);
  }

@Post('login')
login(@Body() dto: { email: string; password: string }) {
  return this.clientAuthService.login(dto);
}

@Post('cliente')
createFromClient(@Body() dto: CreateOrderDto) {
  return this.ordersService.create(dto);
}
}
