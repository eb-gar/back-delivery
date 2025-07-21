import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ClientAuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(dto: { name: string, email: string, password: string, restaurantId: number }) {
  const exists = await this.prisma.client.findUnique({ where: { email: dto.email } });
  if (exists) throw new ConflictException('Email ya registrado');

  const restaurant = await this.prisma.restaurants.findUnique({
    where: { id: dto.restaurantId },
  });
  if (!restaurant) {
    throw new NotFoundException('Restaurante no encontrado');
  }

  const hash = await bcrypt.hash(dto.password, 10);
  const client = await this.prisma.client.create({
    data: {
      name: dto.name,
      email: dto.email,
      password: hash,
      restaurantId: dto.restaurantId
    }
  });

  return { message: 'Registrado correctamente', client };
}

  async login(dto: { email: string, password: string }) {
    const client = await this.prisma.client.findUnique({ where: { email: dto.email } });
    if (!client) throw new UnauthorizedException('Credenciales inválidas');

    const isMatch = await bcrypt.compare(dto.password, client.password);
    if (!isMatch) throw new UnauthorizedException('Credenciales inválidas');

    const token = this.jwt.sign({ sub: client.id, email: client.email, restaurantId: client.restaurantId });

    return { access_token: token, restaurantId: client.restaurantId };
  }
}
