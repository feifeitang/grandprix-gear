import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import {
  CreateCartDto,
  CreateCartItemDto,
  UpdateCartItemDto,
} from '../common/dto';

import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async createCart(@Body() createCartDto: CreateCartDto) {
    return await this.cartService.createCart(createCartDto);
  }

  @Get(':cartId')
  async getCart(@Param('cartId') cartId: number) {
    return await this.cartService.getCart(cartId);
  }

  @Post('item')
  async addCartItem(@Body() createCartItemDto: CreateCartItemDto) {
    return await this.cartService.addCartItem(createCartItemDto);
  }

  @Put(':itemId')
  async updateCartItem(
    @Param('itemId') itemId: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return await this.cartService.updateCartItem(itemId, updateCartItemDto);
  }

  @Delete(':itemId')
  async removeCartItem(@Param('itemId') itemId: number) {
    return await this.cartService.removeCartItem(itemId);
  }
}
