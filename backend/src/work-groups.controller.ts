import { Controller, Get, Query } from '@nestjs/common';
import { WorkGroupsService } from './work-groups.service';

@Controller('work-groups')
export class WorkGroupsController {
  constructor(private readonly workGroupsService: WorkGroupsService) {}

  @Get()
  findByOffice(@Query('officeId') officeId?: string) {
    const id = Number(officeId ?? 1);
    return this.workGroupsService.findByOffice(id);
  }
}
