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
