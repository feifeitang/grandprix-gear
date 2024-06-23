import { Controller, Post, Body } from '@nestjs/common';

import { CheckoutDto, PaymentDto } from '../common/dto';

@Controller('checkout')
export class CheckoutController {
  @Post()
  checkout(@Body() checkoutDto: CheckoutDto) {
    return 'This action initiates the checkout process';
  }

  @Post('payment')
  processPayment(@Body() paymentDto: PaymentDto) {
    return 'This action processes payment for the items in the cart';
  }
}
