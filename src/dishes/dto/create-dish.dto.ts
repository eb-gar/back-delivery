import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateDishDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  price: number;

  @IsNumber()
  restaurantId: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
