import { Type } from 'class-transformer';
import {
  IsCreditCard,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateCartDto {
  @IsOptional()
  @IsInt()
  userId?: number;

  @IsOptional()
  @IsString()
  sessionId?: string;
}

export class CreateCartItemDto {
  @IsInt()
  @IsNotEmpty()
  cartId: number;

  @IsInt()
  @IsNotEmpty()
  productId: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  quantity: number;
}

export class UpdateCartItemDto {
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CheckoutDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['standard', 'next-day'])
  deliveryOption: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['credit_card', 'paypal'])
  paymentMethod: string;
}

export class PaymentDetailsDto {
  @IsOptional()
  @IsCreditCard()
  cardNumber?: string; // Required only if paymentType is 'credit_card'

  @IsOptional()
  @IsString()
  paypalAccount?: string; // Required only if paymentType is 'paypal'
}

export class PaymentDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['credit_card', 'paypal'])
  paymentType: string;

  @ValidateNested()
  @Type(() => PaymentDetailsDto)
  details: PaymentDetailsDto;
}
