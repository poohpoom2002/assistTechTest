import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ServiceTypesService } from './service-types.service';

type CreateServiceTypeDto = {
  officeId: number;
  workGroupId: number;
  name: string;
  startBookingDate: string;
  note?: string;
  schedule: {
    weekday: string;
    timeSlots: { startTime: string; endTime: string; capacity: number }[];
  }[];
};

@Controller('service-types')
export class ServiceTypesController {
  constructor(private readonly serviceTypesService: ServiceTypesService) { }

  @Get('office/:officeId')
  findByOffice(
    @Param('officeId', ParseIntPipe) officeId: number,
    @Query('search') search?: string,
  ) {
    return this.serviceTypesService.findByOffice(officeId, search);
  }

  @Post()
  create(@Body() body: CreateServiceTypeDto) {
    return this.serviceTypesService.create({
      officeId: Number(body.officeId),
      workGroupId: Number(body.workGroupId),
      name: body.name,
      startBookingDate: new Date(body.startBookingDate),
      note: body.note,
      schedule: body.schedule,
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.serviceTypesService.findOne(id);
  }

  @Post(':id') // Using POST for update to avoid CORS preflight issues sometimes, but PUT is standard. Let's stick to standard if possible, but user asked for "like how X works". Assuming standard REST.
  // Actually, let's use @Put()
  // Wait, frontend usually uses PUT or PATCH. Let's use PUT for full replace logic we wrote.
  update(@Param('id', ParseIntPipe) id: number, @Body() body: CreateServiceTypeDto) {
    return this.serviceTypesService.update(id, {
      workGroupId: Number(body.workGroupId),
      name: body.name,
      startBookingDate: new Date(body.startBookingDate),
      note: body.note,
      schedule: body.schedule,
    });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.serviceTypesService.delete(id);
  }
}
