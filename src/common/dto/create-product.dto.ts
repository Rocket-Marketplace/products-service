import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsUUID,
  IsBoolean,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name', example: 'iPhone 15 Pro' })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'Product description',
    example: 'Latest iPhone with advanced features',
  })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Product price', example: 999.99 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'Product stock quantity', example: 10 })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({ description: 'Product category', example: 'Electronics' })
  @IsString()
  @MaxLength(100)
  category: string;

  @ApiProperty({
    description: 'Product image URL',
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  imageUrl?: string;

  @ApiProperty({
    description: 'Seller ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  sellerId: string;

  @ApiProperty({
    description: 'Product status',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
