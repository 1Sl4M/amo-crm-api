import { Controller, Get, Query } from '@nestjs/common';
import { AmoCrmService } from './amo-crm.service';

@Controller('api/leads')
export class AmoCrmController {
  constructor(private readonly amoCrmService: AmoCrmService) {}

  @Get()
  async getLeads(@Query('query') query: string) {
    return this.amoCrmService.getLeads(query);
  }
}
