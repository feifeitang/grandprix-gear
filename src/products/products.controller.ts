import { Controller, Get, Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getAllProducts() {
    return 'This action returns all products';
  }

  @Get(':productId')
  getProductById(@Param('productId') productId: string) {
    return `This action returns product #${productId}`;
  }
}
