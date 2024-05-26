import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { CartController } from './cart/cart.controller';
import { CheckoutController } from './checkout/checkout.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProductsController,
    CartController,
    CheckoutController,
  ],
  providers: [AppService],
})
export class AppModule {}
