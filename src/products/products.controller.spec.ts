import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from '../common/dto/create-product.dto';
import { UpdateProductDto } from '../common/dto/update-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;

  const mockProduct = {
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

  const mockProductsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    updateStock: jest.fn(),
    findBySeller: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      mockProductsService.create.mockResolvedValue(mockProduct);

      const result = await controller.create(createProductDto);

      expect(mockProductsService.create).toHaveBeenCalledWith(createProductDto);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      const query = { page: 1, limit: 10 };
      const expectedResult = {
        products: [mockProduct],
        total: 1,
        page: 1,
        limit: 10,
      };

      mockProductsService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll(query);

      expect(mockProductsService.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      mockProductsService.findOne.mockResolvedValue(mockProduct);

      const result = await controller.findOne(
        '123e4567-e89b-12d3-a456-426614174000',
      );

      expect(mockProductsService.findOne).toHaveBeenCalledWith(
        '123e4567-e89b-12d3-a456-426614174000',
      );
      expect(result).toEqual(mockProduct);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updateProductDto: UpdateProductDto = { name: 'Updated Product' };
      const updatedProduct = { ...mockProduct, name: 'Updated Product' };

      mockProductsService.update.mockResolvedValue(updatedProduct);

      const result = await controller.update(
        '123e4567-e89b-12d3-a456-426614174000',
        updateProductDto,
      );

      expect(mockProductsService.update).toHaveBeenCalledWith(
        '123e4567-e89b-12d3-a456-426614174000',
        updateProductDto,
      );
      expect(result).toEqual(updatedProduct);
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      mockProductsService.remove.mockResolvedValue(undefined);

      await controller.remove('123e4567-e89b-12d3-a456-426614174000');

      expect(mockProductsService.remove).toHaveBeenCalledWith(
        '123e4567-e89b-12d3-a456-426614174000',
      );
    });
  });

  describe('updateStock', () => {
    it('should update product stock', async () => {
      const updatedProduct = { ...mockProduct, stock: 15 };
      mockProductsService.updateStock.mockResolvedValue(updatedProduct);

      const result = await controller.updateStock(
        '123e4567-e89b-12d3-a456-426614174000',
        { quantity: 5 },
      );

      expect(mockProductsService.updateStock).toHaveBeenCalledWith(
        '123e4567-e89b-12d3-a456-426614174000',
        5,
      );
      expect(result).toEqual(updatedProduct);
    });
  });
});
