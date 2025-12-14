import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data in correct order
  await prisma.stockMovement.deleteMany();
  await prisma.stockOut.deleteMany();
  await prisma.stockIn.deleteMany();
  await prisma.stock.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.otp.deleteMany();
  await prisma.user.deleteMany();

  console.log("🧹 Cleared existing data.");

  // Create test users
  const hashedPassword = await bcrypt.hash("password123", 10);

  const user1 = await prisma.user.create({
    data: {
      email: "john@example.com",
      firstName: "John",
      lastName: "Doe",
      password: hashedPassword,
      role: "ADMIN",
      isVerified: true,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "jane@example.com",
      firstName: "Jane",
      lastName: "Smith",
      password: hashedPassword,
      role: "USER",
      isVerified: true,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    },
  });

  console.log("✅ Created users");

  // Create categories for user1
  const electronics = await prisma.category.create({
    data: {
      name: "Electronics",
      description: "Electronic devices and accessories",
      createdById: user1.id,
    },
  });

  const clothing = await prisma.category.create({
    data: {
      name: "Clothing",
      description: "Apparel and fashion items",
      createdById: user1.id,
    },
  });

  // Create categories for user2
  const furniture = await prisma.category.create({
    data: {
      name: "Furniture",
      description: "Home and office furniture",
      createdById: user2.id,
    },
  });

  console.log("✅ Created categories");

  // Create products for user1
  const laptop = await prisma.product.create({
    data: {
      name: "Laptop Pro 15",
      description: "High-performance laptop",
      sku: "SKU-ELE-001",
      costPrice: 800,
      sellingPrice: 1200,
      categoryId: electronics.id,
      createdById: user1.id,
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    },
  });

  const phone = await prisma.product.create({
    data: {
      name: "Smartphone X",
      description: "Latest smartphone model",
      sku: "SKU-ELE-002",
      costPrice: 500,
      sellingPrice: 800,
      categoryId: electronics.id,
      createdById: user1.id,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    },
  });

  const tshirt = await prisma.product.create({
    data: {
      name: "Cotton T-Shirt",
      description: "Comfortable cotton t-shirt",
      sku: "SKU-CLO-001",
      costPrice: 10,
      sellingPrice: 25,
      categoryId: clothing.id,
      createdById: user1.id,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    },
  });

  // Create products for user2
  const desk = await prisma.product.create({
    data: {
      name: "Office Desk",
      description: "Ergonomic office desk",
      sku: "SKU-FUR-001",
      costPrice: 150,
      sellingPrice: 300,
      categoryId: furniture.id,
      createdById: user2.id,
      image:
        "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400",
    },
  });

  console.log("✅ Created products");

  // Create stock entries
  await prisma.stock.createMany({
    data: [
      { productId: laptop.id, quantity: 50 },
      { productId: phone.id, quantity: 100 },
      { productId: tshirt.id, quantity: 200 },
      { productId: desk.id, quantity: 30 },
    ],
  });

  console.log("✅ Created stock entries");

  // Create stock movements for user1
  await prisma.stockIn.createMany({
    data: [
      { productId: laptop.id, quantity: 50, createdById: user1.id },
      { productId: phone.id, quantity: 100, createdById: user1.id },
      { productId: tshirt.id, quantity: 200, createdById: user1.id },
    ],
  });

  await prisma.stockOut.createMany({
    data: [
      { productId: laptop.id, quantity: 5, createdById: user1.id },
      { productId: phone.id, quantity: 10, createdById: user1.id },
    ],
  });

  await prisma.stockMovement.createMany({
    data: [
      { productId: laptop.id, quantity: 50, type: "IN", createdById: user1.id },
      { productId: phone.id, quantity: 100, type: "IN", createdById: user1.id },
      {
        productId: tshirt.id,
        quantity: 200,
        type: "IN",
        createdById: user1.id,
      },
      { productId: laptop.id, quantity: 5, type: "OUT", createdById: user1.id },
      { productId: phone.id, quantity: 10, type: "OUT", createdById: user1.id },
    ],
  });

  // Create stock movements for user2
  await prisma.stockIn.create({
    data: { productId: desk.id, quantity: 30, createdById: user2.id },
  });

  await prisma.stockMovement.create({
    data: {
      productId: desk.id,
      quantity: 30,
      type: "IN",
      createdById: user2.id,
    },
  });

  console.log("✅ Created stock movements");
  console.log("🎉 Seeding completed successfully!");
  console.log("\n📝 Test accounts:");
  console.log("User 1: john@example.com / password123");
  console.log("User 2: jane@example.com / password123");
}
main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
