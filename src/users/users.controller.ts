import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUsers(@Query('name') name: string, @Query('age') age: number) {
    return this.userService.getAllUsers(name, age);
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('profilePicture'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateUserDto }) //  Swagger example body
  async createUser(
    @Body(ValidationPipe) dto: CreateUserDto,
    @UploadedFile() profilePicture: Express.Multer.File,
  ) {
    return this.userService.createUser(dto, profilePicture);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    const updated = this.userService.updateUser(id, updateUserDto);
  }

  @Delete()
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    const deleted = this.userService.deleteUser(id);
    return deleted;
  }
}
