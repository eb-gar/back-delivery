import { ForbiddenException, Injectable } from '@nestjs/common';
import { UpdateMotorizedDto } from './dto/update-motorized.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MotorizedService {
  constructor(private prisma: PrismaService) {}

  getProfile(id: string) {
    return this.prisma.motorized.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, phone: true },
    });
  }

  updateProfile(id: string, dto: UpdateMotorizedDto) {
    return this.prisma.motorized.update({
      where: { id },
      data: dto,
    });
  }

  async getActiveOrder(id: string) {
    return this.prisma.order.findFirst({
      where: {
        motorizedId: id,
        status: { not: 'DELIVERED' },
      },
    });
  }

  getOrderHistory(id: string) {
    return this.prisma.order.findMany({
      where: {
        motorizedId: id,
        status: 'DELIVERED',
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getStats(id: string) {
    const total = await this.prisma.order.count({ where: { motorizedId: id } });
    const delivered = await this.prisma.order.count({
      where: { motorizedId: id, status: 'DELIVERED' },
    });
    return { total, delivered };
  }

  async marcarComoEntregado(motorizedId: string, orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order || order.motorizedId !== motorizedId) {
      throw new ForbiddenException('No autorizado');
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: 'DELIVERED' },
    });
  }
}
