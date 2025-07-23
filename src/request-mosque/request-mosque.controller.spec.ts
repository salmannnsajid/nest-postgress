import { Test, TestingModule } from '@nestjs/testing';
import { RequestMosqueController } from './request-mosque.controller';

describe('RequestMosqueController', () => {
  let controller: RequestMosqueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestMosqueController],
    }).compile();

    controller = module.get<RequestMosqueController>(RequestMosqueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
