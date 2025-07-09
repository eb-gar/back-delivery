import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(dto: { email: string; password: string }) {
    const existing = await this.prisma.superAdmin.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('El email ya está registrado');

    const hash = await bcrypt.hash(dto.password, 10);
    const superadmin = await this.prisma.superAdmin.create({
      data: { email: dto.email, password: hash },
    });

    return { message: 'SuperAdmin registrado exitosamente', superadmin };
  }

  async login(dto: { email: string; password: string }) {
    const superadmin = await this.prisma.superAdmin.findUnique({ where: { email: dto.email } });
    if (!superadmin) throw new UnauthorizedException('Credenciales inválidas');

    const isMatch = await bcrypt.compare(dto.password, superadmin.password);
    if (!isMatch) throw new UnauthorizedException('Credenciales inválidas');

    const token = this.jwt.sign({ sub: superadmin.id, email: superadmin.email });

    return { access_token: token };
  }
}
