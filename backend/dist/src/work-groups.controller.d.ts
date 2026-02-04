import { WorkGroupsService } from './work-groups.service';
export declare class WorkGroupsController {
    private readonly workGroupsService;
    constructor(workGroupsService: WorkGroupsService);
    findByOffice(officeId?: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        officeId: number;
    }[]>;
}
