import { Module } from '@nestjs/common';
import { WorkGroupsController } from '../work-groups.controller';
import { WorkGroupsService } from '../work-groups.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [WorkGroupsController],
  providers: [WorkGroupsService, PrismaService],
  exports: [WorkGroupsService],
})
export class WorkGroupsModule {}
