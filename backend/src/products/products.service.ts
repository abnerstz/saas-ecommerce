import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductFilterDto } from './dto/product-filter.dto';
import { generateSlug } from '@ecommerce/utils';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const {
      name,
      categoryIds,
      images,
      variants,
      attributes,
      seo,
      ...productData
    } = createProductDto;

    const slug = generateSlug(name);

    const product = await this.prisma.product.create({
      data: {
        ...productData,
        name,
        slug,
        seo: seo ? JSON.stringify(seo) : null,
        attributes: attributes ? JSON.stringify(attributes) : null,
        categories: {
          connect: categoryIds?.map(id => ({ id })) || [],
        },
        images: {
          create:
            images?.map((image, index) => ({
              url: image.url,
              alt: image.alt || name,
              order: index,
            })) || [],
        },
        variants: {
          create:
            variants?.map(variant => ({
              name: variant.name,
              sku: variant.sku,
              price: variant.price,
              compareAtPrice: variant.compareAtPrice,
              stock: variant.stock,
              attributes: variant.attributes
                ? JSON.stringify(variant.attributes)
                : null,
            })) || [],
        },
      },
      include: {
        categories: true,
        images: {
          orderBy: { order: 'asc' },
        },
        variants: true,
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

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (categoryId) {
      where.categories = {
        some: { id: categoryId },
      };
    }

    if (status) {
      where.status = status;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          categories: true,
          images: {
            orderBy: { order: 'asc' },
            take: 1,
          },
          variants: {
            take: 1,
            orderBy: { price: 'asc' },
          },
          _count: {
            select: { variants: true },
          },
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
        categories: true,
        images: {
          orderBy: { order: 'asc' },
        },
        variants: true,
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
        categories: true,
        images: {
          orderBy: { order: 'asc' },
        },
        variants: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { categoryIds, images, variants, attributes, seo, ...productData } =
      updateProductDto;

    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    // Gerar novo slug se o nome mudou
    let slug = product.slug;
    if (updateProductDto.name && updateProductDto.name !== product.name) {
      slug = generateSlug(updateProductDto.name);
    }

    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: {
        ...productData,
        slug,
        seo: seo ? JSON.stringify(seo) : undefined,
        attributes: attributes ? JSON.stringify(attributes) : undefined,
        categories: categoryIds
          ? {
              set: categoryIds.map(id => ({ id })),
            }
          : undefined,
      },
      include: {
        categories: true,
        images: {
          orderBy: { order: 'asc' },
        },
        variants: true,
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
      include: {
        categories: {
          select: { id: true },
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    const categoryIds = product.categories.map(cat => cat.id);

    const relatedProducts = await this.prisma.product.findMany({
      where: {
        AND: [
          { id: { not: id } },
          { status: 'ACTIVE' },
          {
            categories: {
              some: {
                id: { in: categoryIds },
              },
            },
          },
        ],
      },
      take: 8,
      include: {
        categories: true,
        images: {
          orderBy: { order: 'asc' },
          take: 1,
        },
        variants: {
          take: 1,
          orderBy: { price: 'asc' },
        },
      },
    });

    return relatedProducts;
  }
}
