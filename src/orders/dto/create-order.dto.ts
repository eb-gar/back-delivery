import { IsNumber, IsString, IsArray } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  clientId: number;

  @IsNumber()
  restaurantId: number;

  @IsArray()
  @IsString({ each: true })
  items: string[];

  @IsNumber()
  total: number;

  @IsString()
  estado: string;
}
