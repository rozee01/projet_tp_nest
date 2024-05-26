import { Test, TestingModule } from '@nestjs/testing';
import { EmailServerController } from './email-server.controller';

describe('EmailServerController', () => {
  let controller: EmailServerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailServerController],
    }).compile();

    controller = module.get<EmailServerController>(EmailServerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
