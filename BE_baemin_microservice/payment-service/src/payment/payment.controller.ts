import { Controller, Delete, Get, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentService } from './payment.service';

// @UseGuards(AuthGuard('jwt'))
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post()
  @MessagePattern("payment_createOrders")
  createOrders(@Payload() createPaymentDto) {
    return this.paymentService.createOrders(createPaymentDto);
  }

  @Get("order")
  @MessagePattern("payment_getAllOrder")
  getAllOrder() {
    return this.paymentService.getAllOrder()
  }

  @Get("orderDetail")
  @MessagePattern("payment_getOrderDetail")
  getOrderDetail(@Payload('id') id: string) {
    return this.paymentService.getOrderDetail(id)
  }

  @Delete("order")
  @MessagePattern("payment_delOrder")
  delOrder(@Payload('id') id: string) {
    return this.paymentService.delOrder(id)
  }
}
