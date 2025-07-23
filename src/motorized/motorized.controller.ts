import { Controller, Get, Put, Body, Patch, Param } from '@nestjs/common';
import { MotorizedService } from './motorized.service';
import { UpdateMotorizedDto } from './dto/update-motorized.dto';
import { UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt-motorized'))
@Controller('motorized')
export class MotorizedController {
  constructor(private readonly motorizedService: MotorizedService) {}

  @Get('profile')
  getProfile(@Req() req) {
    return this.motorizedService.getProfile(req.user.id);
  }

  @Put('profile')
  updateProfile(@Req() req, @Body() dto: UpdateMotorizedDto) {
    return this.motorizedService.updateProfile(req.user.id, dto);
  }

  @Get('orders/active')
  getActiveOrder(@Req() req) {
    return this.motorizedService.getActiveOrder(req.user.id);
  }

  @Get('orders/history')
  getOrderHistory(@Req() req) {
    return this.motorizedService.getOrderHistory(req.user.id);
  }

  @Get('stats')
  getStats(@Req() req) {
    return this.motorizedService.getStats(req.user.id);
  }

  @Patch('orders/:id/entregado')
  marcarEntregado(@Param('id') id: string, @Req() req) {
    return this.motorizedService.marcarComoEntregado(req.user.id, id);
  }
}
