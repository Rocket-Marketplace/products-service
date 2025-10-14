import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  Request,
  HttpException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from '../common/dto/create-product.dto';
import { UpdateProductDto } from '../common/dto/update-product.dto';
import { ProductQueryDto } from '../common/dto/product-query.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(
    @Request() req: any,
    @Body() createProductDto: CreateProductDto
  ) {
    // Extrai informações do usuário dos headers enviados pela API Gateway
    const userId = req.headers['x-user-id'];
    const userRole = req.headers['x-user-role'];
    
    // Apenas vendedores podem criar produtos
    if (userRole !== 'seller') {
      throw new HttpException('Only sellers can create products', HttpStatus.FORBIDDEN);
    }

    // Associa o produto ao vendedor logado
    createProductDto.sellerId = userId;
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products with pagination and filters' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
  async findAll(@Query() query: ProductQueryDto) {
    return this.productsService.findAll(query);
  }

  @Get('my-products')
  @UseGuards(SessionGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get products of the logged seller' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
  async findMyProducts(
    @Request() req: { user: any },
    @Query() query: ProductQueryDto,
  ) {
    if (req.user.role !== 'seller') {
      throw new HttpException('Only sellers can access this endpoint', HttpStatus.FORBIDDEN);
    }
    return this.productsService.findBySeller(req.user.id, query);
  }

  @Get('seller/:sellerId')
  @ApiOperation({ summary: 'Get products by seller' })
  @ApiParam({ name: 'sellerId', description: 'Seller ID' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
  async findBySeller(
    @Param('sellerId') sellerId: string,
    @Query() query: ProductQueryDto,
  ) {
    return this.productsService.findBySeller(sellerId, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const userId = req.headers['x-user-id'];
    return this.productsService.updateByOwner(id, updateProductDto, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete product' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 204, description: 'Product deleted successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async remove(
    @Request() req: any,
    @Param('id') id: string
  ) {
    const userId = req.headers['x-user-id'];
    return this.productsService.removeByOwner(id, userId);
  }

  @Patch(':id/stock')
  @ApiOperation({ summary: 'Update product stock' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Stock updated successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 400, description: 'Insufficient stock' })
  async updateStock(
    @Request() req: any,
    @Param('id') id: string,
    @Body() body: { quantity: number },
  ) {
    const userId = req.headers['x-user-id'];
    return this.productsService.updateStockByOwner(id, body.quantity, userId);
  }
}
