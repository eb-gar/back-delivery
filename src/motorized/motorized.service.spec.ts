import { Test, TestingModule } from '@nestjs/testing';
import { MotorizedService } from './motorized.service';

describe('MotorizedService', () => {
  let service: MotorizedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MotorizedService],
    }).compile();

    service = module.get<MotorizedService>(MotorizedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
