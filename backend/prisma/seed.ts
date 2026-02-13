import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar usuário admin
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'Sistema',
      password: hashedPassword,
      role: 'ADMIN',
      isEmailVerified: true,
      isActive: true,
    },
  });

  console.log('✅ Usuário admin criado:', adminUser.email);

  // Criar loja padrão
  const defaultStore = await prisma.store.upsert({
    where: { slug: 'loja-exemplo' },
    update: {},
    create: {
      name: 'Loja Exemplo',
      slug: 'loja-exemplo',
      description: 'Loja de exemplo para demonstração',
      niche: 'GENERAL',
      isActive: true,
      settings: JSON.stringify({
        theme: 'default',
        primaryColor: '#007bff',
        secondaryColor: '#6c757d',
        currency: 'BRL',
        language: 'pt-BR',
        enableReviews: true,
        enableWishlist: true,
        enableMultiplePaymentMethods: true,
      }),
    },
  });

  console.log('✅ Loja padrão criada:', defaultStore.name);

  // Criar categorias
  const categories = [
    {
      name: 'Eletrônicos',
      description: 'Produtos eletrônicos e gadgets',
      slug: 'eletronicos',
      isActive: true,
      order: 1,
    },
    {
      name: 'Roupas',
      description: 'Vestuário e acessórios',
      slug: 'roupas',
      isActive: true,
      order: 2,
    },
    {
      name: 'Casa e Jardim',
      description: 'Produtos para casa e jardim',
      slug: 'casa-jardim',
      isActive: true,
      order: 3,
    },
    {
      name: 'Livros',
      description: 'Livros e e-books',
      slug: 'livros',
      isActive: true,
      order: 4,
    },
  ];

  const createdCategories = [];
  for (const category of categories) {
    const createdCategory = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
    createdCategories.push(createdCategory);
    console.log('✅ Categoria criada:', createdCategory.name);
  }

  // Criar produtos de exemplo
  const products = [
    {
      name: 'iPhone 15 Pro',
      description: 'O mais recente iPhone com chip A17 Pro e câmera avançada',
      shortDescription: 'iPhone mais avançado da Apple',
      price: 8999.99,
      compareAtPrice: 9999.99,
      sku: 'IPHONE15PRO-128',
      stock: 50,
      status: 'ACTIVE',
      slug: 'iphone-15-pro',
      isDigital: false,
      requiresShipping: true,
      isFeatured: true,
      weight: 187,
      length: 14.67,
      width: 7.09,
      height: 0.83,
      categoryId: createdCategories[0].id, // Eletrônicos
    },
    {
      name: 'Camiseta Básica Algodão',
      description: 'Camiseta básica 100% algodão, confortável e durável',
      shortDescription: 'Camiseta básica de qualidade',
      price: 49.99,
      sku: 'CAMISETA-BASICA-M',
      stock: 100,
      status: 'ACTIVE',
      slug: 'camiseta-basica-algodao',
      isDigital: false,
      requiresShipping: true,
      isFeatured: false,
      weight: 200,
      categoryId: createdCategories[1].id, // Roupas
    },
    {
      name: 'E-book: Programação com TypeScript',
      description: 'Guia completo para aprender TypeScript do básico ao avançado',
      shortDescription: 'Aprenda TypeScript na prática',
      price: 29.99,
      sku: 'EBOOK-TYPESCRIPT',
      stock: 999,
      status: 'ACTIVE',
      slug: 'ebook-programacao-typescript',
      isDigital: true,
      requiresShipping: false,
      isFeatured: true,
      categoryId: createdCategories[3].id, // Livros
    },
  ];

  for (const product of products) {
    const createdProduct = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        ...product,
        categories: {
          connect: { id: product.categoryId },
        },
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80',
              alt: product.name,
              order: 0,
            },
          ],
        },
      },
    });
    console.log('✅ Produto criado:', createdProduct.name);
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
