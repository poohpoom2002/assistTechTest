import { Test, TestingModule } from '@nestjs/testing';
import { WorkGroupsService } from './work-groups.service';

describe('WorkGroupsService', () => {
  let service: WorkGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkGroupsService],
    }).compile();

    service = module.get<WorkGroupsService>(WorkGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
