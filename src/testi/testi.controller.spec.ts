import { Test, TestingModule } from '@nestjs/testing';
import { TestiController } from './testi.controller';

describe('TestiController', () => {
  let controller: TestiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestiController],
    }).compile();

    controller = module.get<TestiController>(TestiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
