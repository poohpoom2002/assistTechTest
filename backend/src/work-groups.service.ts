import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class WorkGroupsService {
  constructor(private readonly prisma: PrismaService) {}

  findByOffice(officeId: number) {
    return this.prisma.workGroup.findMany({
      where: { officeId },
      orderBy: { id: 'asc' },
    });
  }
}
