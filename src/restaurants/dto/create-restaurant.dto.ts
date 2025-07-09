import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'El propietario no puede estar vacío' })
  propietario: string;

  @IsString()
  @IsNotEmpty({ message: 'La dirección no puede estar vacía' })
  direccion: string;
}
