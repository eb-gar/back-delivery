import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRestaurantDto) {
    return this.prisma.restaurants.create({ data });
  }

  async findAll() {
    return this.prisma.restaurants.findMany();
  }
}

