import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateRestaurantAdminDto } from './dto/create-restaurant-admin.dto';

@Injectable()
export class RestaurantAdminsService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(dto: CreateRestaurantAdminDto) {
  const existing = await this.prisma.restaurantAdmin.findUnique({
    where: { email: dto.email },
  });

  if (existing) throw new ConflictException('Ya existe ese correo');

  const restaurant = await this.prisma.restaurants.findUnique({
    where: { id: dto.restaurantId },
  });

  if (!restaurant) {
    throw new Error(`El restaurante con ID ${dto.restaurantId} no existe`);
  }

  const hash = await bcrypt.hash(dto.password, 10);

  const admin = await this.prisma.restaurantAdmin.create({
    data: {
      email: dto.email,
      password: hash,
      restaurantId: dto.restaurantId,
    },
  });

  return { message: 'Admin registrado', admin };
}


  async login(dto: { email: string; password: string }) {
    const admin = await this.prisma.restaurantAdmin.findUnique({
      where: { email: dto.email },
    });

    if (!admin) throw new UnauthorizedException('Credenciales inválidas');

    const isMatch = await bcrypt.compare(dto.password, admin.password);
    if (!isMatch) throw new UnauthorizedException('Credenciales inválidas');

    const token = this.jwt.sign({
      sub: admin.id,
      restaurantId: admin.restaurantId,
      role: 'RESTAURANT_ADMIN',
    });

    return {
      access_token: token,
      restaurantId: admin.restaurantId,
    };
  }
}
