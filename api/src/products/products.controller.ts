import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductFilterDto } from './dto/product-filter.dto';
import { UserRole } from '../common/types';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Criar produto' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.TENANT_ADMIN, UserRole.MANAGER)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Listar produtos com filtros' })
  @Get()
  findAll(@Query() filters: ProductFilterDto) {
    return this.productsService.findAll(filters);
  }

  @ApiOperation({ summary: 'Buscar produto por ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @ApiOperation({ summary: 'Buscar produto por slug' })
  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @ApiOperation({ summary: 'Atualizar produto' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.TENANT_ADMIN, UserRole.MANAGER)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Remover produto' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.TENANT_ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @ApiOperation({ summary: 'Buscar produtos por categoria' })
  @Get('category/:categoryId')
  findByCategory(
    @Param('categoryId') categoryId: string,
    @Query() filters: ProductFilterDto
  ) {
    return this.productsService.findByCategory(categoryId, filters);
  }

  @ApiOperation({ summary: 'Buscar produtos relacionados' })
  @Get(':id/related')
  findRelated(@Param('id') id: string) {
    return this.productsService.findRelated(id);
  }
}
