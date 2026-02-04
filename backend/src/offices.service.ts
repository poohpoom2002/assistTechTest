import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class OfficesService {
  constructor(private readonly prisma: PrismaService) { }

  findAll() {
    return this.prisma.office.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }
}
