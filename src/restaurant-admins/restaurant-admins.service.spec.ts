import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantAdminsService } from './restaurant-admins.service';

describe('RestaurantAdminsService', () => {
  let service: RestaurantAdminsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantAdminsService],
    }).compile();

    service = module.get<RestaurantAdminsService>(RestaurantAdminsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
