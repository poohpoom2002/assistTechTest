import { ServiceTypesService } from './service-types.service';
type CreateServiceTypeDto = {
    officeId: number;
    workGroupId: number;
    name: string;
    startBookingDate: string;
    note?: string;
    schedule: {
        weekday: string;
        timeSlots: {
            startTime: string;
            endTime: string;
            capacity: number;
        }[];
    }[];
};
export declare class ServiceTypesController {
    private readonly serviceTypesService;
    constructor(serviceTypesService: ServiceTypesService);
    findByOffice(officeId: number, search?: string): import(".prisma/client").Prisma.PrismaPromise<({
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
    create(body: CreateServiceTypeDto): Promise<{
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
    update(id: number, body: CreateServiceTypeDto): Promise<({
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
export {};
