import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductFilterDto } from './dto/product-filter.dto';
import { generateSlug } from '../common/utils/helpers';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const {
      name,
      categoryIds,
      images,
      attributes,
      seo,
      compareAtPrice,
      isFeatured,
      stock,
      isDigital: _isDigital,
      requiresShipping: _requiresShipping,
      ...productData
    } = createProductDto;

    const slug = generateSlug(name);

    const imagesJson =
      images?.map((img, index) => ({
        url: img.url,
        alt: img.alt ?? name,
        order: index,
      })) ?? null;

    const product = await this.prisma.product.create({
      data: {
        ...productData,
        name,
        slug,
        quantity: stock,
        salePrice: compareAtPrice,
        featured: isFeatured ?? false,
        metaTitle: seo?.title,
        metaDescription: seo?.description,
        attributes: attributes ? (attributes as object) : null,
        images: imagesJson as object,
        categoryId: categoryIds?.[0] ?? null,
      },
      include: {
        category: true,
      },
    });

    return product;
  }

  async findAll(filters: ProductFilterDto) {
    const {
      page = 1,
      limit = 20,
      search,
      categoryId,
      status,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = filters;

    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (status) {
      where.status = status;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) (where.price as { gte?: number }).gte = minPrice;
      if (maxPrice !== undefined) (where.price as { lte?: number }).lte = maxPrice;
    }

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          category: true,
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const {
      categoryIds,
      images,
      attributes,
      seo,
      compareAtPrice,
      isFeatured,
      ...productData
    } = updateProductDto;

    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    let slug = product.slug;
    if (updateProductDto.name && updateProductDto.name !== product.name) {
      slug = generateSlug(updateProductDto.name);
    }

    const imagesJson = images?.map((img, index) => ({
      url: img.url,
      alt: img.alt ?? product.name,
      order: index,
    }));

    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: {
        ...productData,
        slug,
        salePrice: compareAtPrice,
        featured: isFeatured,
        metaTitle: seo?.title,
        metaDescription: seo?.description,
        attributes: attributes ? (attributes as object) : undefined,
        images: imagesJson as object | undefined,
        categoryId: categoryIds?.[0],
      },
      include: {
        category: true,
      },
    });

    return updatedProduct;
  }

  async remove(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    await this.prisma.product.delete({
      where: { id },
    });

    return { message: 'Produto removido com sucesso' };
  }

  async findByCategory(categoryId: string, filters: ProductFilterDto) {
    return this.findAll({ ...filters, categoryId });
  }

  async findRelated(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: { categoryId: true },
    });

    if (!product || !product.categoryId) {
      const fallback = await this.prisma.product.findMany({
        where: { id: { not: id }, status: 'ACTIVE' },
        take: 8,
        include: { category: true },
      });
      return fallback;
    }

    const relatedProducts = await this.prisma.product.findMany({
      where: {
        id: { not: id },
        status: 'ACTIVE',
        categoryId: product.categoryId,
      },
      take: 8,
      include: {
        category: true,
      },
    });

    return relatedProducts;
  }
}
