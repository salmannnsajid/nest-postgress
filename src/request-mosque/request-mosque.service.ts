import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { RequestMosque } from './entities/request-mosque.entity';
import { CreateRequestMosqueDto } from './dto/create-request-mosque.dto';

@Injectable()
export class RequestMosqueService {
  constructor(
    @InjectRepository(RequestMosque)
    private readonly mosqueRepo: Repository<RequestMosque>,
  ) {}

  async create(dto: CreateRequestMosqueDto) {
    // Prevent duplicate accepted mosque names
    const existingAccepted = await this.mosqueRepo.findOne({
      where: { name: dto.name, status: 'accepted' },
    });
    if (existingAccepted) {
      throw new BadRequestException(
        'A mosque with this name has already been accepted.',
      );
    }

    const newMosque = this.mosqueRepo.create(dto);
    return this.mosqueRepo.save(newMosque);
  }

  findAll() {
    return this.mosqueRepo.find();
  }

  async findOne(id: number) {
    const mosque = await this.mosqueRepo.findOneBy({ id });
    if (!mosque) {
      throw new NotFoundException('Mosque not found');
    }

    return this.mosqueRepo.findOneBy({ id });
  }

  async remove(id: number) {
    const mosque = await this.mosqueRepo.findOneBy({ id });

    if (!mosque) {
      throw new NotFoundException('Mosque not found');
    }

    return this.mosqueRepo.delete(id);
  }

  async accept(id: number) {
    const mosque = await this.mosqueRepo.findOneBy({ id });
    if (!mosque) throw new Error('Mosque not found');

    // 1. Accept the mosque
    mosque.status = 'accepted';
    await this.mosqueRepo.save(mosque);

    // 2. Delete other pending/rejected requests with the same name
    await this.mosqueRepo.delete({
      name: mosque.name,
      id: Not(id),
    });

    return { message: 'Mosque request accepted and duplicates deleted.' };
  }

  async reject(id: number) {
    const mosque = await this.mosqueRepo.findOneBy({ id });
    if (!mosque) throw new Error('Mosque request not found');

    mosque.status = 'rejected';
    return this.mosqueRepo.save(mosque);
  }
}
