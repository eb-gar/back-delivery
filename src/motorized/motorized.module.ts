import { Module } from '@nestjs/common';
import { MotorizedService } from './motorized.service';
import { MotorizedController } from './motorized.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [MotorizedController],
  providers: [MotorizedService],
})
export class MotorizedModule {}
