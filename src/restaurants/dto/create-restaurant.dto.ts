import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  propietario: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @IsOptional()
  primaryColor?: string;

  @IsString()
  @IsOptional()
  secondaryColor?: string;

  @IsString()
  @IsOptional()
  logoUrl?: string;
}
