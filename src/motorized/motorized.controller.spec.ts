import { Test, TestingModule } from '@nestjs/testing';
import { MotorizedController } from './motorized.controller';
import { MotorizedService } from './motorized.service';

describe('MotorizedController', () => {
  let controller: MotorizedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotorizedController],
      providers: [MotorizedService],
    }).compile();

    controller = module.get<MotorizedController>(MotorizedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
