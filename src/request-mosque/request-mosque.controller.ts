import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RequestMosqueService } from './request-mosque.service';
import { CreateRequestMosqueDto } from './dto/create-request-mosque.dto';

@Controller('request-mosque')
export class RequestMosqueController {
  constructor(private readonly requestMosqueService: RequestMosqueService) {}

  @Post()
  create(@Body() dto: CreateRequestMosqueDto) {
    return this.requestMosqueService.create(dto);
  }

  @Get()
  findAll() {
    return this.requestMosqueService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return this.requestMosqueService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return this.requestMosqueService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':id/accept')
  async accept(@Param('id') id: string) {
    try {
      return await this.requestMosqueService.accept(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':id/reject')
  async reject(@Param('id') id: string) {
    try {
      return await this.requestMosqueService.reject(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
