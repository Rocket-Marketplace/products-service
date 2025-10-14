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
  UseGuards,
  Request,
  HttpException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from '../common/dto/create-product.dto';
import { UpdateProductDto } from '../common/dto/update-product.dto';
import { ProductQueryDto } from '../common/dto/product-query.dto';
import { SessionGuard } from '../auth/guards/session.guard';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(SessionGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new product (requires seller session)' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Request() req: { user: any },
    @Body() createProductDto: CreateProductDto
  ) {
    // Apenas vendedores podem criar produtos
    if (req.user.role !== 'seller') {
      throw new HttpException('Only sellers can create products', HttpStatus.FORBIDDEN);
    }
    
    // Associa o produto ao vendedor logado
    createProductDto.sellerId = req.user.id;
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
  @UseGuards(SessionGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update product (only owner seller)' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async update(
    @Request() req: { user: any },
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateByOwner(id, updateProductDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(SessionGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete product (only owner seller)' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 204, description: 'Product deleted successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async remove(
    @Request() req: { user: any },
    @Param('id') id: string
  ) {
    return this.productsService.removeByOwner(id, req.user.id);
  }

  @Patch(':id/stock')
  @UseGuards(SessionGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update product stock (only owner seller)' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Stock updated successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 400, description: 'Insufficient stock' })
  async updateStock(
    @Request() req: { user: any },
    @Param('id') id: string,
    @Body() body: { quantity: number },
  ) {
    return this.productsService.updateStockByOwner(id, body.quantity, req.user.id);
  }
}
