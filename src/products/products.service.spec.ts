import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from '../common/dto/create-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockProduct: Product = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Test Product',
    description: 'Test Description',
    price: 99.99,
    stock: 10,
    category: 'Test Category',
    imageUrl: 'https://example.com/image.jpg',
    sellerId: '123e4567-e89b-12d3-a456-426614174001',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn(),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        stock: 10,
        category: 'Test Category',
        imageUrl: 'https://example.com/image.jpg',
        sellerId: '123e4567-e89b-12d3-a456-426614174001',
      };

      mockRepository.create.mockReturnValue(mockProduct);
      mockRepository.save.mockResolvedValue(mockProduct);

      const result = await service.create(createProductDto);

      expect(mockRepository.create).toHaveBeenCalledWith(createProductDto);
      expect(mockRepository.save).toHaveBeenCalledWith(mockProduct);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('findOne', () => {
    it('should return a product when found', async () => {
      mockRepository.findOne.mockResolvedValue(mockProduct);

      const result = await service.findOne(
        '123e4567-e89b-12d3-a456-426614174000',
      );

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '123e4567-e89b-12d3-a456-426614174000', isActive: true },
      });
      expect(result).toEqual(mockProduct);
    });

    it('should throw NotFoundException when product not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateStock', () => {
    it('should update stock successfully', async () => {
      const updatedProduct = { ...mockProduct, stock: 15 };
      mockRepository.findOne.mockResolvedValue(mockProduct);
      mockRepository.save.mockResolvedValue(updatedProduct);

      const result = await service.updateStock(
        '123e4567-e89b-12d3-a456-426614174000',
        5,
      );

      expect(result.stock).toBe(15);
    });

    it('should throw BadRequestException when insufficient stock', async () => {
      mockRepository.findOne.mockResolvedValue(mockProduct);

      await expect(
        service.updateStock('123e4567-e89b-12d3-a456-426614174000', -20),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
