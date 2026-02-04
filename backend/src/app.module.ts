import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ServiceTypesModule } from './service-types/service-types.module';
import { OfficesModule } from './offices/offices.module';
import { WorkGroupsModule } from './work-groups/work-groups.module';

@Module({
  imports: [ServiceTypesModule, OfficesModule, WorkGroupsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
