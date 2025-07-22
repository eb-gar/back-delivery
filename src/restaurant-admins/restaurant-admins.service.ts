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
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

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

  async registerClient(dto: { email: string; password: string; name: string }) {
    const existing = await this.prisma.client.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new ConflictException('El email ya está registrado');

    const hash = await bcrypt.hash(dto.password, 10);
    const cliente = await this.prisma.client.create({
      data: { email: dto.email, password: hash, name: dto.name },
    });

    return { message: 'Cliente registrado exitosamente', cliente };
  }

  async login(dto: { email: string; password: string }) {
    // Buscar en SuperAdmin
    const superadmin = await this.prisma.superAdmin.findUnique({
      where: { email: dto.email },
    });
    if (
      superadmin &&
      (await bcrypt.compare(dto.password, superadmin.password))
    ) {
      const token = this.jwt.sign({
        sub: superadmin.id,
        email: superadmin.email,
        role: 'SUPER_ADMIN',
      });
      return { access_token: token, role: 'SUPER_ADMIN' };
    }

    // Buscar en RestaurantAdmin
    const admin = await this.prisma.restaurantAdmin.findUnique({
      where: { email: dto.email },
    });
    if (admin && (await bcrypt.compare(dto.password, admin.password))) {
      const token = this.jwt.sign({
        sub: admin.id,
        email: admin.email,
        role: 'RESTAURANT_ADMIN',
        restaurantId: admin.restaurantId,
      });
      return {
        access_token: token,
        role: 'RESTAURANT_ADMIN',
        restaurantId: admin.restaurantId,
      };
    }

    // Buscar en Cliente
    const cliente = await this.prisma.client.findUnique({
      where: { email: dto.email },
    });
    if (cliente && (await bcrypt.compare(dto.password, cliente.password))) {
      const token = this.jwt.sign({
        sub: cliente.id,
        email: cliente.email,
        role: 'CLIENTE',
      });
      return { access_token: token, role: 'CLIENTE' };
    }

    throw new UnauthorizedException('Credenciales inválidas');
  }
}
