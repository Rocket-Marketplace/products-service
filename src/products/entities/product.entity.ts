import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('products')
export class Product {
  @ApiProperty({ description: 'Product ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Product name' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ description: 'Product description' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ description: 'Product price' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ApiProperty({ description: 'Product stock quantity' })
  @Column({ type: 'int', default: 0 })
  stock: number;

  @ApiProperty({ description: 'Product category' })
  @Column({ type: 'varchar', length: 100 })
  category: string;

  @ApiProperty({ description: 'Product image URL' })
  @Column({ type: 'varchar', length: 500, nullable: true })
  imageUrl: string | null;

  @ApiProperty({ description: 'Seller ID' })
  @Column({ type: 'uuid' })
  sellerId: string;

  @ApiProperty({ description: 'Product status' })
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Creation date' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Last update date' })
  @UpdateDateColumn()
  updatedAt: Date;
}
