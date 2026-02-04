import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
export declare class ServiceTypesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByOffice(officeId: number, search?: string): Prisma.PrismaPromise<({
        workGroup: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            officeId: number;
        };
        workingDays: ({
            timeSlots: {
                id: number;
                startTime: string;
                endTime: string;
                capacity: number;
                workingDayId: number;
            }[];
        } & {
            id: number;
            weekday: string;
            isOpen: boolean;
            serviceTypeId: number;
        })[];
    } & {
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        officeId: number;
        startBookingDate: Date;
        note: string | null;
        workGroupId: number;
    })[]>;
    create(data: {
        officeId: number;
        workGroupId: number;
        name: string;
        startBookingDate: Date;
        note?: string;
        schedule: {
            weekday: string;
            timeSlots: {
                startTime: string;
                endTime: string;
                capacity: number;
            }[];
        }[];
    }): Promise<{
        workingDays: ({
            timeSlots: {
                id: number;
                startTime: string;
                endTime: string;
                capacity: number;
                workingDayId: number;
            }[];
        } & {
            id: number;
            weekday: string;
            isOpen: boolean;
            serviceTypeId: number;
        })[];
    } & {
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        officeId: number;
        startBookingDate: Date;
        note: string | null;
        workGroupId: number;
    }>;
    findOne(id: number): Promise<({
        workGroup: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            officeId: number;
        };
        workingDays: ({
            timeSlots: {
                id: number;
                startTime: string;
                endTime: string;
                capacity: number;
                workingDayId: number;
            }[];
        } & {
            id: number;
            weekday: string;
            isOpen: boolean;
            serviceTypeId: number;
        })[];
    } & {
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        officeId: number;
        startBookingDate: Date;
        note: string | null;
        workGroupId: number;
    }) | null>;
    update(id: number, data: {
        workGroupId: number;
        name: string;
        startBookingDate: Date;
        note?: string;
        schedule: {
            weekday: string;
            timeSlots: {
                startTime: string;
                endTime: string;
                capacity: number;
            }[];
        }[];
    }): Promise<({
        workGroup: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            officeId: number;
        };
        workingDays: ({
            timeSlots: {
                id: number;
                startTime: string;
                endTime: string;
                capacity: number;
                workingDayId: number;
            }[];
        } & {
            id: number;
            weekday: string;
            isOpen: boolean;
            serviceTypeId: number;
        })[];
    } & {
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        officeId: number;
        startBookingDate: Date;
        note: string | null;
        workGroupId: number;
    }) | null>;
    delete(id: number): Promise<{
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        officeId: number;
        startBookingDate: Date;
        note: string | null;
        workGroupId: number;
    }>;
}
