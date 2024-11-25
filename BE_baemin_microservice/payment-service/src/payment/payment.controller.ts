import { Controller, Delete, Get, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentService } from './payment.service';

// @UseGuards(AuthGuard('jwt'))
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @MessagePattern("payment_createOrders")
  createOrders(@Payload() createPaymentDto) {
    return this.paymentService.createOrders(createPaymentDto);
  }

  @MessagePattern("payment_getAllOrder")
  getAllOrder() {
    return this.paymentService.getAllOrder()
  }

  @MessagePattern("payment_getOrderDetail")
  getOrderDetail(@Payload() id: string) {
    return this.paymentService.getOrderDetail(id)
  }

  @MessagePattern("payment_delOrder")
  delOrder(@Payload() id: string) {
    return this.paymentService.delOrder(id)
  }
}
