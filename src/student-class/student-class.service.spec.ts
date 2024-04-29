import { Test, TestingModule } from '@nestjs/testing';
import { StudentClassService } from './student-class.service';

describe('StudentClassService', () => {
  let service: StudentClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentClassService],
    }).compile();

    service = module.get<StudentClassService>(StudentClassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
