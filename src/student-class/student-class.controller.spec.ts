import { Test, TestingModule } from '@nestjs/testing';
import { StudentClassController } from './student-class.controller';

describe('StudentClassController', () => {
  let controller: StudentClassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentClassController],
    }).compile();

    controller = module.get<StudentClassController>(StudentClassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
