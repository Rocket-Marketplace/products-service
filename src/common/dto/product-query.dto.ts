import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class ProductQueryDto {
  @ApiProperty({ description: 'Page number', example: 1, required: false })
  @IsOptional()
  @Transform(({ value }) => parseInt(String(value), 10))
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ description: 'Items per page', example: 10, required: false })
  @IsOptional()
  @Transform(({ value }) => parseInt(String(value), 10))
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiProperty({
    description: 'Search term',
    example: 'iPhone',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    description: 'Category filter',
    example: 'Electronics',
    required: false,
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ description: 'Minimum price', example: 100, required: false })
  @IsOptional()
  @Transform(({ value }) => parseFloat(String(value)))
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiProperty({ description: 'Maximum price', example: 1000, required: false })
  @IsOptional()
  @Transform(({ value }) => parseFloat(String(value)))
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @ApiProperty({
    description: 'Seller ID filter',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsString()
  sellerId?: string;
}
