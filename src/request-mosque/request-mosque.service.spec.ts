import { Test, TestingModule } from '@nestjs/testing';
import { RequestMosqueService } from './request-mosque.service';

describe('RequestMosqueService', () => {
  let service: RequestMosqueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestMosqueService],
    }).compile();

    service = module.get<RequestMosqueService>(RequestMosqueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
