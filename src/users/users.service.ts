import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { writeFile, mkdir } from 'fs/promises';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getAllUsers(name?: string, age?: number) {
    const where: FindOptionsWhere<any> = {};

    if (name) where.name = name;
    if (age !== undefined) where.age = age;

    return this.userRepo.find({ where });
  }

  async getUserById(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  async createUser(dto: CreateUserDto, profilePicture: Express.Multer.File) {
    const user = await this.userRepo.findOne({
      where: { email: dto.email },
    });

    if (user) {
      throw new BadRequestException('Email already exists');
    }

    const fileName = `${Date.now()}-${profilePicture.originalname}`;
    const uploadDir = path.join(process.cwd(), 'uploads');

    // ✅ Ensure the uploads folder exists BEFORE writing
    if (!fs.existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, profilePicture.buffer);

    dto.profilePicture = `uploads/${fileName}`;

    return this.userRepo.save(dto);
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('No User Found');
    }
    const updatedUser = this.userRepo.merge(user, dto);
    return await this.userRepo.save(updatedUser);
  }

  async deleteUser(id: number) {
    await this.userRepo.delete({ id });
    return { message: 'User has been deleted.' };
  }
}
