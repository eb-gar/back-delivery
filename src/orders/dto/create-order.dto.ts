import { Type } from 'class-transformer';
import { IsNumber, IsString, IsArray, ValidateNested } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  clientId: number;

  @IsNumber()
  restaurantId: number;

  @IsString()
  estado: string;

  @IsNumber()
  total: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}

export class OrderItemDto {
  @IsNumber()
  platoId: number;

  @IsNumber()
  cantidad: number;
}
