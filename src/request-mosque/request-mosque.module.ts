import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestMosqueService } from './request-mosque.service';
import { RequestMosqueController } from './request-mosque.controller';
import { RequestMosque } from './entities/request-mosque.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestMosque])],
  controllers: [RequestMosqueController],
  providers: [RequestMosqueService],
})
export class RequestMosqueModule {}
