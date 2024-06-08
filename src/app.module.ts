import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CartController } from './cart/cart.controller';
import { CheckoutController } from './checkout/checkout.controller';
import { Category } from './entities/category.entity';
import { OrderDetail } from './entities/order-detail.entity';
import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';
import { Supplier } from './entities/supplier.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Category, OrderDetail, Order, Product, Supplier, User],
        synchronize: true,
      }),
    }),
    ProductsModule,
  ],
  controllers: [AppController, CartController, CheckoutController],
  providers: [AppService],
})
export class AppModule {}
