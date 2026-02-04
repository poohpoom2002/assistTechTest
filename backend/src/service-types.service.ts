import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ServiceTypesService {
  constructor(private readonly prisma: PrismaService) { }

  findByOffice(officeId: number, search?: string) {
    const where: Prisma.ServiceTypeWhereInput = {
      officeId,
      isActive: true,
      ...(search
        ? {
          name: {
            contains: search,
          },
        }
        : {}),
    };
    return this.prisma.serviceType.findMany({
      where,
      include: {
        workGroup: true,
        workingDays: {
          include: { timeSlots: true },
        },
      },
      orderBy: { id: 'asc' },
    });
  }

  async create(data: {
    officeId: number;
    workGroupId: number;
    name: string;
    startBookingDate: Date;
    note?: string;
    schedule: {
      weekday: string;
      timeSlots: { startTime: string; endTime: string; capacity: number }[];
    }[];
  }) {
    const { schedule, ...serviceData } = data;
    return this.prisma.serviceType.create({
      data: {
        ...serviceData,
        workingDays: {
          create: schedule.map((day) => ({
            weekday: day.weekday,
            isOpen: true,
            timeSlots: {
              create: day.timeSlots.map((slot) => ({
                startTime: slot.startTime,
                endTime: slot.endTime,
                capacity: slot.capacity,
              })),
            },
          })),
        },
      },
      include: {
        workingDays: {
          include: { timeSlots: true },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.serviceType.findUnique({
      where: { id },
      include: {
        workGroup: true,
        workingDays: {
          include: { timeSlots: true },
        },
      },
    });
  }

  async update(
    id: number,
    data: {
      workGroupId: number;
      name: string;
      startBookingDate: Date;
      note?: string;
      schedule: {
        weekday: string;
        timeSlots: { startTime: string; endTime: string; capacity: number }[];
      }[];
    },
  ) {
    const { schedule, ...serviceData } = data;

    // Use transaction to ensure consistency
    return this.prisma.$transaction(async (tx) => {
      // 1. Update basic fields
      const updated = await tx.serviceType.update({
        where: { id },
        data: serviceData,
      });

      // 2. Clear existing schedule (simplest approach for full replace)
      // Find existing days first to get their IDs (optional if we use deleteMany based on serviceTypeId)
      // However, Prisma doesn't support deep delete in one go easily, so we query first or use deleteMany on relations

      // Delete all timeslots belonging to days of this service
      // We need to find the days first
      const currentDays = await tx.serviceWorkingDay.findMany({
        where: { serviceTypeId: id },
        select: { id: true }
      });
      const dayIds = currentDays.map(d => d.id);

      if (dayIds.length > 0) {
        await tx.serviceTimeSlot.deleteMany({
          where: { workingDayId: { in: dayIds } }
        });

        await tx.serviceWorkingDay.deleteMany({
          where: { id: { in: dayIds } }
        });
      }

      // 3. Re-create schedule
      for (const day of schedule) {
        await tx.serviceWorkingDay.create({
          data: {
            serviceTypeId: id,
            weekday: day.weekday,
            isOpen: true,
            timeSlots: {
              create: day.timeSlots.map((slot) => ({
                startTime: slot.startTime,
                endTime: slot.endTime,
                capacity: slot.capacity,
              })),
            },
          },
        });
      }

      return this.findOne(id);
    });
  }

  async delete(id: number) {
    // Delete in transaction to ensure all related data is removed
    return this.prisma.$transaction(async (tx) => {
      // Get working days for this service type
      const workingDays = await tx.serviceWorkingDay.findMany({
        where: { serviceTypeId: id },
        select: { id: true }
      });
      const dayIds = workingDays.map(d => d.id);

      // Delete time slots first
      if (dayIds.length > 0) {
        await tx.serviceTimeSlot.deleteMany({
          where: { workingDayId: { in: dayIds } }
        });

        // Delete working days
        await tx.serviceWorkingDay.deleteMany({
          where: { id: { in: dayIds } }
        });
      }

      // Finally delete the service type
      return tx.serviceType.delete({
        where: { id }
      });
    });
  }
}
