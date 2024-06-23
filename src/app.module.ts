import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';
import { CheckoutController } from './checkout/checkout.controller';
import { CartItem } from './entities/cart-item.entity';
import { Cart } from './entities/cart.entity';
import { Category } from './entities/category.entity';
import { OrderDetail } from './entities/order-detail.entity';
import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';
import { Supplier } from './entities/supplier.entity';
import { User } from './entities/user.entity';
import { ProductsModule } from './products/products.module';

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
        entities: [
          CartItem,
          Cart,
          Category,
          OrderDetail,
          Order,
          Product,
          Supplier,
          User,
        ],
        synchronize: true,
      }),
    }),
    ProductsModule,
    CartModule,
  ],
  controllers: [AppController, CheckoutController],
  providers: [AppService],
})
export class AppModule {}
