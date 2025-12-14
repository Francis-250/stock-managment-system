import prisma from "../utils/prisma.js";
import cloudinary from "../utils/cloudinary.js";

export async function createProduct(req, res) {
  const { name, description, costPrice, sellingPrice, categoryId, status } =
    req.body;
  const userId = req.user.id;

  if (!name || !categoryId || !costPrice || !sellingPrice) {
    return res.status(400).json({
      message: "Name, categoryId, costPrice and sellingPrice are required",
    });
  }

  try {
    const existingProduct = await prisma.product.findUnique({
      where: { name_createdById: { name, createdById: userId } },
    });

    if (existingProduct) {
      return res
        .status(409)
        .json({ message: "Product with this name already exists" });
    }

    const existingCategory = await prisma.category.findFirst({
      where: { id: categoryId, createdById: userId },
    });

    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    const categoryCode = existingCategory.name.substring(0, 3).toUpperCase();

    const lastProduct = await prisma.product.findFirst({
      where: {
        sku: { startsWith: `SKU-${categoryCode}-` },
        createdById: userId,
      },
      orderBy: { createdAt: "desc" },
    });

    let nextNumber = 1;
    if (lastProduct) {
      const parts = lastProduct.sku.split("-");
      const lastNumber = parseInt(parts[2], 10);
      nextNumber = lastNumber + 1;
    }
    const numberStr = String(nextNumber).padStart(3, "0");
    const sku = `SKU-${categoryCode}-${numberStr}`;
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "sms-upload",
    });
    const image = cloudinary.url(result.public_id, {
      // width: 150,
      // height: 150,
      // crop: "thumb",
    });

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        costPrice: parseFloat(costPrice),
        sellingPrice: parseFloat(sellingPrice),
        categoryId,
        status: status || "ACTIVE",
        sku,
        image,
        createdById: userId,
      },
    });

    const existingStock = await prisma.stock.findUnique({
      where: { productId: newProduct.id },
    });

    if (!existingStock) {
      await prisma.stock.create({
        data: {
          productId: newProduct.id,
          quantity: 0,
        },
      });
    }
    return res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getProducts(req, res) {
  const userId = req.user.id;
  try {
    const products = await prisma.product.findMany({
      where: { createdById: userId },
      include: {
        category: true,
        stock: true,
      },
    });
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getProductById(req, res) {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const product = await prisma.product.findFirst({
      where: { id, createdById: userId },
      include: {
        category: true,
        stock: true,
      },
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateProduct(req, res) {
  const { id } = req.params;
  const { name, description, costPrice, sellingPrice, categoryId, status } =
    req.body;
  const userId = req.user.id;
  try {
    const existingProduct = await prisma.product.findFirst({
      where: { id, createdById: userId },
    });
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    let image = existingProduct.image;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "sms-upload",
      });
      image = cloudinary.url(result.public_id, {
        // width: 150,
        // height: 150,
        // crop: "thumb",
      });
    }
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: name || existingProduct.name,
        description: description || existingProduct.description,
        costPrice: costPrice
          ? parseFloat(costPrice)
          : existingProduct.costPrice,
        sellingPrice: sellingPrice
          ? parseFloat(sellingPrice)
          : existingProduct.sellingPrice,
        categoryId: categoryId || existingProduct.categoryId,
        status: status || existingProduct.status,
        image,
      },
    });
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteProduct(req, res) {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const existingProduct = await prisma.product.findFirst({
      where: { id, createdById: userId },
    });
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    await prisma.product.delete({
      where: { id },
    });
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
