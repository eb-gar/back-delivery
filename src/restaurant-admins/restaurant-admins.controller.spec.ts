import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantAdminsController } from './restaurant-admins.controller';

describe('RestaurantAdminsController', () => {
  let controller: RestaurantAdminsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantAdminsController],
    }).compile();

    controller = module.get<RestaurantAdminsController>(RestaurantAdminsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
