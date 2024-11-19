import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Check health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({summary: 'Check health service for microsevice'})
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
