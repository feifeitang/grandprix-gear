import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts(@Query() query: any) {
    return this.productsService.findAll(query);
  }

  @Get(':productId')
  getProductById(@Param('productId') productId: string) {
    return this.productsService.findOne(productId);
  }
}
