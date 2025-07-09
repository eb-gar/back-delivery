import { IsString, IsOptional } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  nombre: string;

  @IsString()
  propietario: string;

  @IsOptional()
  @IsString()
  direccion?: string;
}
