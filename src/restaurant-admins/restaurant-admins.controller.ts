import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { RestaurantAdminsService } from './restaurant-admins.service';
import { CreateRestaurantAdminDto } from './dto/create-restaurant-admin.dto';

@Controller('restaurant-admins')
export class RestaurantAdminsController {
  constructor(private service: RestaurantAdminsService) {}

  @Post('register')
  register(
    @Body(new ValidationPipe()) dto: CreateRestaurantAdminDto,
  ) {
    return this.service.register(dto);
  }

  @Post('login')
  login(
    @Body(new ValidationPipe()) dto: { email: string; password: string },
  ) {
    return this.service.login(dto);
  }

 @Post('register-client')
registerClient(
  @Body(new ValidationPipe()) dto: { email: string; password: string; name: string }
) {
  return this.service.registerClient(dto);
}



}
