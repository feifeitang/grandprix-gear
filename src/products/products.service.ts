import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  // Retrieve all products, applying filters, sorting, and pagination as needed
  findAll(query: any) {
    // Here you can add logic to handle filtering, sorting, and pagination
    return this.productsRepository.find();
  }

  // Retrieve a specific product by ID
  findOne(productId: string) {
    const id = parseInt(productId, 10); // Convert productId to a number
    return this.productsRepository.findOne({ where: { productId: id } });
  }
}
