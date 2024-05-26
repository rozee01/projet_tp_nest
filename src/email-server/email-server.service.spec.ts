import { Test, TestingModule } from '@nestjs/testing';
import { EmailServerService } from './email-server.service';

describe('EmailServerService', () => {
  let service: EmailServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailServerService],
    }).compile();

    service = module.get<EmailServerService>(EmailServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
