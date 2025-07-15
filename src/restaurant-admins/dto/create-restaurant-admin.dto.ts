import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateRestaurantAdminDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  restaurantId: number;
}
