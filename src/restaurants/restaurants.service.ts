import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRestaurantDto) {
    const cleanData = {
      nombre: data.nombre.trim(),
      propietario: data.propietario.trim(),
      direccion: data.direccion?.trim(),
      primaryColor: data.primaryColor || '#3880ff',
      secondaryColor: data.secondaryColor || '#3dc2ff',
    };

    const existing = await this.prisma.restaurants.findFirst({
      where: {
        nombre: cleanData.nombre,
      },
    });

    if (existing) {
      throw new Error('Ya existe un restaurante con ese nombre');
    }

    return this.prisma.restaurants.create({ data: cleanData });
  }

  findAll() {
    return this.prisma.restaurants.findMany();
  }

  findOne(id: number) {
    return this.prisma.restaurants.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateRestaurantDto) {
    return this.prisma.restaurants.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.restaurants.delete({
      where: { id },
    });
  }
}
