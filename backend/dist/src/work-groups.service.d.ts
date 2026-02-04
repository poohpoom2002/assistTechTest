import { PrismaService } from './prisma.service';
export declare class WorkGroupsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByOffice(officeId: number): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        officeId: number;
    }[]>;
}
