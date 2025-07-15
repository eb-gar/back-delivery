import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';

@Injectable()
export class DishesService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateDishDto) {
    return this.prisma.dish.create({ data });
  }

  findAllByRestaurant(restaurantId: number) {
    return this.prisma.dish.findMany({
      where: { restaurantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: number) {
    return this.prisma.dish.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateDishDto) {
    return this.prisma.dish.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.dish.delete({ where: { id } });
  }
}
