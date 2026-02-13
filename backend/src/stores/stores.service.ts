import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { generateSlug } from '@ecommerce/utils';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}

  async create(createStoreDto: CreateStoreDto) {
    const { name, settings, ...storeData } = createStoreDto;

    const slug = generateSlug(name);

    // Verificar se já existe uma loja com o mesmo slug
    const existingStore = await this.prisma.store.findUnique({
      where: { slug },
    });

    if (existingStore) {
      throw new ConflictException('Já existe uma loja com este nome');
    }

    const store = await this.prisma.store.create({
      data: {
        ...storeData,
        name,
        slug,
        settings: settings ? JSON.stringify(settings) : null,
      },
    });

    return store;
  }

  async findAll() {
    const stores = await this.prisma.store.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });

    return stores;
  }

  async findOne(id: string) {
    const store = await this.prisma.store.findUnique({
      where: { id },
    });

    if (!store) {
      throw new NotFoundException('Loja não encontrada');
    }

    return store;
  }

  async findBySlug(slug: string) {
    const store = await this.prisma.store.findUnique({
      where: { slug },
    });

    if (!store) {
      throw new NotFoundException('Loja não encontrada');
    }

    return store;
  }

  async getSettings(id: string) {
    const store = await this.prisma.store.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        slug: true,
        settings: true,
      },
    });

    if (!store) {
      throw new NotFoundException('Loja não encontrada');
    }

    return {
      ...store,
      settings: store.settings ? JSON.parse(store.settings as string) : null,
    };
  }

  async update(id: string, updateStoreDto: UpdateStoreDto) {
    const { name, settings, ...storeData } = updateStoreDto;

    const store = await this.prisma.store.findUnique({
      where: { id },
    });

    if (!store) {
      throw new NotFoundException('Loja não encontrada');
    }

    // Gerar novo slug se o nome mudou
    let slug = store.slug;
    if (name && name !== store.name) {
      slug = generateSlug(name);

      // Verificar se já existe uma loja com o novo slug
      const existingStore = await this.prisma.store.findFirst({
        where: {
          slug,
          id: { not: id },
        },
      });

      if (existingStore) {
        throw new ConflictException('Já existe uma loja com este nome');
      }
    }

    const updatedStore = await this.prisma.store.update({
      where: { id },
      data: {
        ...storeData,
        name,
        slug,
        settings: settings ? JSON.stringify(settings) : undefined,
      },
    });

    return updatedStore;
  }
}
