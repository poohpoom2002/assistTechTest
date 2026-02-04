import { OfficesService } from './offices.service';
export declare class OfficesController {
    private readonly officesService;
    constructor(officesService: OfficesService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        code: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
