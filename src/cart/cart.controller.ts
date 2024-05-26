import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateCartItemDto, UpdateCartItemDto } from '../common/dto';

@Controller('cart')
export class CartController {
  @Post()
  addToCart(@Body() createCartItemDto: CreateCartItemDto) {
    return 'This action adds a new cart item';
  }

  @Get()
  getCart() {
    return 'This action returns all items in cart';
  }

  @Put(':itemId')
  updateCartItem(
    @Param('itemId') itemId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return `This action updates cart item #${itemId}`;
  }

  @Delete(':itemId')
  removeCartItem(@Param('itemId') itemId: string) {
    return `This action removes cart item #${itemId}`;
  }
}
