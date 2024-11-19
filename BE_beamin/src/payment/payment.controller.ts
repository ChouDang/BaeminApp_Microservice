import { Body, Controller, Delete, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentService } from './payment.service';

@ApiBearerAuth()
@ApiTags('Payment')
@UseGuards(AuthGuard('jwt'))
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @ApiOperation({ summary: 'Tao don hang' })
  @Post()
  createOrders(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.createOrders(createPaymentDto);
  }

  @ApiOperation({ summary: 'tat ca don hang' })
  @Get("order")
  getAllOrder() {
    return this.paymentService.getAllOrder()
  }

  @ApiOperation({ summary: 'chi tiet don hang' })
  @Get("orderDetail")
  getOrderDetail(@Query('id') id: string) {
    return this.paymentService.getOrderDetail(id)
  }

  @ApiOperation({ summary: 'del don hang' })
  @Delete("order")
  delOrder(@Query('id') id: string) {
    return this.paymentService.delOrder(id)
  }
}
