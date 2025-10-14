import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { UsersService } from '../services/users.service';
import { SessionGuard } from '../auth/guards/session.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    HttpModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, UsersService, SessionGuard],
  exports: [ProductsService],
})
export class ProductsModule {}
