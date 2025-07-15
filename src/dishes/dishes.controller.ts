import {
  Controller, Get, Post, Body, Patch, Param, Delete,
  ParseIntPipe, UseInterceptors, UploadedFile, ValidationPipe,
} from '@nestjs/common';
import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('dishes')
export class DishesController {
  constructor(
    private readonly service: DishesService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  @Post()
  create(@Body(new ValidationPipe()) dto: CreateDishDto) {
    return this.service.create(dto);
  }

  @Get('restaurant/:restaurantId')
  findAllByRestaurant(@Param('restaurantId', ParseIntPipe) restaurantId: number) {
    return this.service.findAllByRestaurant(restaurantId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) dto: UpdateDishDto
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }

  @Post(':id/upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const url = await this.cloudinary.uploadImage(file);
    return this.service.update(id, { imageUrl: url });
  }
}
