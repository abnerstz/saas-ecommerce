import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  const hashedPassword = await bcrypt.hash('admin123', 12);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'Sistema',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      isEmailVerified: true,
      isActive: true,
    },
  });

  console.log('✅ Usuário admin criado:', adminUser.email);

  const categories = [
    {
      name: 'Eletrônicos',
      description: 'Produtos eletrônicos e gadgets',
      slug: 'eletronicos',
      isActive: true,
      sortOrder: 1,
    },
    {
      name: 'Roupas',
      description: 'Vestuário e acessórios',
      slug: 'roupas',
      isActive: true,
      sortOrder: 2,
    },
    {
      name: 'Casa e Jardim',
      description: 'Produtos para casa e jardim',
      slug: 'casa-jardim',
      isActive: true,
      sortOrder: 3,
    },
    {
      name: 'Livros',
      description: 'Livros e e-books',
      slug: 'livros',
      isActive: true,
      sortOrder: 4,
    },
  ];

  const createdCategories = [];
  for (const category of categories) {
    const created = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
    createdCategories.push(created);
    console.log('✅ Categoria criada:', created.name);
  }

  const defaultImage =
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80';

  const products = [
    {
      name: 'iPhone 15 Pro',
      description: 'O mais recente iPhone com chip A17 Pro e câmera avançada',
      shortDescription: 'iPhone mais avançado da Apple',
      price: 8999.99,
      salePrice: 9999.99,
      sku: 'IPHONE15PRO-128',
      quantity: 50,
      status: 'ACTIVE',
      slug: 'iphone-15-pro',
      featured: true,
      weight: 187,
      length: 14.67,
      width: 7.09,
      height: 0.83,
      categoryId: createdCategories[0].id,
      images: [{ url: defaultImage, alt: 'iPhone 15 Pro', order: 0 }],
    },
    {
      name: 'Camiseta Básica Algodão',
      description: 'Camiseta básica 100% algodão, confortável e durável',
      shortDescription: 'Camiseta básica de qualidade',
      price: 49.99,
      sku: 'CAMISETA-BASICA-M',
      quantity: 100,
      status: 'ACTIVE',
      slug: 'camiseta-basica-algodao',
      featured: false,
      weight: 200,
      categoryId: createdCategories[1].id,
      images: [{ url: defaultImage, alt: 'Camiseta Básica', order: 0 }],
    },
    {
      name: 'E-book: Programação com TypeScript',
      description: 'Guia completo para aprender TypeScript do básico ao avançado',
      shortDescription: 'Aprenda TypeScript na prática',
      price: 29.99,
      sku: 'EBOOK-TYPESCRIPT',
      quantity: 999,
      status: 'ACTIVE',
      slug: 'ebook-programacao-typescript',
      featured: true,
      categoryId: createdCategories[3].id,
      images: [{ url: defaultImage, alt: 'E-book TypeScript', order: 0 }],
    },
  ];

  for (const product of products) {
    const { images, ...data } = product;
    const created = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        ...data,
        images: images as object,
      },
    });
    console.log('✅ Produto criado:', created.name);
  }

  console.log('🎉 Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
