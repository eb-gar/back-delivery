import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateOrderDto) {
    const { clientId, restaurantId, ...rest } = data;

    return this.prisma.order.create({
      data: {
        ...rest,
        client: { connect: { id: clientId } },
        restaurant: { connect: { id: restaurantId } },
      },
    });
  }

  findByRestaurant(restaurantId: number) {
    return this.prisma.order.findMany({
      where: { restaurantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  update(id: number, data: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.order.delete({ where: { id } });
  }
}
