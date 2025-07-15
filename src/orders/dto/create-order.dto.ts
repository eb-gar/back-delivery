import { IsString, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  cliente: string;

  @IsNumber()
  total: number;

  @IsNumber()
  restaurantId: number;
}
