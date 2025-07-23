import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateOrderDto) {
    const { clientId, restaurantId, items, total, estado } = data;

    const client = await this.prisma.client.findUnique({
      where: { id: clientId },
    });
    if (!client) throw new Error(`Cliente con ID ${clientId} no existe`);

    const restaurant = await this.prisma.restaurants.findUnique({
      where: { id: restaurantId },
    });
    if (!restaurant)
      throw new Error(`Restaurante con ID ${restaurantId} no existe`);

    const order = await this.prisma.order.create({
      data: {
        clientId,
        restaurantId,
        total,
        estado,
      },
    });

    for (const item of items) {
      await this.prisma.orderItem.create({
        data: {
          cantidad: item.cantidad,
          order: { connect: { id: order.id } },
          plato: { connect: { id: item.platoId } },
        },
      });
    }

    return this.findOne(order.id); 
  }

  findOne(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        client: true,
        restaurant: true,
        items: {
          include: {
            plato: true,
          },
        },
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
