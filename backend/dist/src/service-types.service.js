"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceTypesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
let ServiceTypesService = class ServiceTypesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findByOffice(officeId, search) {
        const where = {
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
    async create(data) {
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
    async findOne(id) {
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
    async update(id, data) {
        const { schedule, ...serviceData } = data;
        return this.prisma.$transaction(async (tx) => {
            const updated = await tx.serviceType.update({
                where: { id },
                data: serviceData,
            });
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
    async delete(id) {
        return this.prisma.$transaction(async (tx) => {
            const workingDays = await tx.serviceWorkingDay.findMany({
                where: { serviceTypeId: id },
                select: { id: true }
            });
            const dayIds = workingDays.map(d => d.id);
            if (dayIds.length > 0) {
                await tx.serviceTimeSlot.deleteMany({
                    where: { workingDayId: { in: dayIds } }
                });
                await tx.serviceWorkingDay.deleteMany({
                    where: { id: { in: dayIds } }
                });
            }
            return tx.serviceType.delete({
                where: { id }
            });
        });
    }
};
exports.ServiceTypesService = ServiceTypesService;
exports.ServiceTypesService = ServiceTypesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ServiceTypesService);
//# sourceMappingURL=service-types.service.js.map