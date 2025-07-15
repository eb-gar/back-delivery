import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  create(@Body(new ValidationPipe()) createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post(':id/upload-logo')
  async uploadLogo(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const url = await this.cloudinaryService.uploadImage(file);
    return this.restaurantsService.update(id, { logoUrl: url });
  }

  @Get()
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Get(':id/config')
  getConfig(@Param('id', ParseIntPipe) id: number) {
    return this.restaurantsService.findOne(id); 
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantsService.update(id, updateRestaurantDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.restaurantsService.delete(id);
  }
}
