import { Controller, Get } from '@nestjs/common';
import { OfficesService } from './offices.service';

@Controller('offices')
export class OfficesController {
  constructor(private readonly officesService: OfficesService) {}

  @Get()
  findAll() {
    return this.officesService.findAll();
  }
}
