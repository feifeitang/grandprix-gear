import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import {
  CreateCartDto,
  CreateCartItemDto,
  UpdateCartItemDto,
} from 'src/common/dto';
import { CartItem } from 'src/entities/cart-item.entity';
import { Cart } from 'src/entities/cart.entity';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Create a new cart
  async createCart(createCartDto: CreateCartDto): Promise<Cart> {
    const { userId, sessionId } = createCartDto;

    // Check if neither userId nor sessionId is provided
    if (!userId && !sessionId) {
      throw new BadRequestException(
        'Either userId or sessionId must be provided.',
      );
    }

    const cart = this.cartRepository.create(createCartDto);
    return await this.cartRepository.save(cart);
  }

  // Retrieve all items in a specific cart
  async getCart(cartId: number): Promise<CartItem[]> {
    const cart = await this.cartRepository.findOne({ where: { cartId } });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return await this.cartItemRepository.find({ where: { cartId } });
  }

  // Add an item to the cart
  async addCartItem(createCartItemDto: CreateCartItemDto) {
    const { cartId, productId, quantity } = createCartItemDto;

    // Retrieve product price from the database
    const product = await this.productRepository.findOne({
      where: { productId },
    });
    if (!product) {
      throw new Error('Product not found');
    }

    const cartItem = this.cartItemRepository.create({
      cartId,
      productId,
      quantity,
      price: product.price, // Use the price from the database
    });

    return await this.cartItemRepository.save(cartItem);
  }

  // Update an existing cart item
  //   async updateCartItem(itemId: number, updateCartItemDto: UpdateCartItemDto) {
  //     await this.cartItemRepository.update(itemId, updateCartItemDto);
  //     return this.cartItemRepository.findOne(itemId);
  //   }

  // Remove an item from the cart
  //   async removeCartItem(itemId: number) {
  //     const item = await this.cartItemRepository.findOne(itemId);
  //     if (item) {
  //       await this.cartItemRepository.remove(item);
  //       return { deleted: true };
  //     }
  //     return { deleted: false };
  //   }
}
