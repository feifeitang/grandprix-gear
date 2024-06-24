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

  // Retrieve all items in a specific cart and calculate total price
  async getCart(
    cartId: number,
  ): Promise<{ items: CartItem[]; totalPrice: number }> {
    const cart = await this.cartRepository.findOne({ where: { cartId } });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const items = await this.cartItemRepository.find({ where: { cartId } });

    const itemsWithPrices = await Promise.all(
      items.map(async (item) => {
        const product = await this.productRepository.findOne({
          where: { productId: item.productId },
        });
        if (!product) {
          throw new NotFoundException(
            `Product with ID ${item.productId} not found`,
          );
        }
        return {
          ...item,
          price: product.price,
          total: product.price * item.quantity,
        };
      }),
    );

    const totalPrice = itemsWithPrices.reduce(
      (total, item) => total + item.total,
      0,
    );

    return { items: itemsWithPrices, totalPrice };
  }

  // Add an item to the cart
  async addCartItem(createCartItemDto: CreateCartItemDto) {
    const { cartId, productId, quantity } = createCartItemDto;

    // Ensure the cart exists
    const cart = await this.cartRepository.findOne({ where: { cartId } });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    // Ensure the product exists
    const product = await this.productRepository.findOne({
      where: { productId },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const cartItem = this.cartItemRepository.create({
      cartId,
      productId,
      quantity,
    });

    return await this.cartItemRepository.save(cartItem);
  }

  // Update an existing cart item
  async updateCartItem(
    cartItemId: number,
    updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItem> {
    // Ensure the item exists before updating
    const cartItem = await this.cartItemRepository.findOne({
      where: { cartItemId },
    });
    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    await this.cartItemRepository.update(cartItemId, updateCartItemDto);
    return this.cartItemRepository.findOne({ where: { cartItemId } });
  }

  // Remove an item from the cart
  async removeCartItem(cartItemId: number): Promise<{ deleted: boolean }> {
    const item = await this.cartItemRepository.findOne({
      where: { cartItemId },
    });
    if (item) {
      await this.cartItemRepository.remove(item);
      return { deleted: true };
    }
    return { deleted: false };
  }
}
