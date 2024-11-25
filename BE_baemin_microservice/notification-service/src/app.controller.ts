import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern("confirm_order")
  sendMailConfirm(@Payload() data) {
    return this.appService.sendMailConfirm(data);
  }

  @EventPattern("success_order")
  sendMailSuccess(@Payload() data) {
    return this.appService.sendMailSuccess(data);
  }
}
