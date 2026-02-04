import { Test, TestingModule } from '@nestjs/testing';
import { WorkGroupsController } from './work-groups.controller';

describe('WorkGroupsController', () => {
  let controller: WorkGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkGroupsController],
    }).compile();

    controller = module.get<WorkGroupsController>(WorkGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
