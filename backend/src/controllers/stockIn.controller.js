import prisma from "../utils/prisma.js";

export async function createStockIn(req, res) {
  const userId = req.user.id;
  const { productId, quantity } = req.body;
  if (!productId || !quantity) {
    return res
      .status(400)
      .json({ message: "Product ID and quantity are required" });
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingProduct = await prisma.product.findFirst({
      where: { id: productId, createdById: userId },
    });
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    const newStockIn = await prisma.stockIn.create({
      data: {
        productId,
        quantity: parseInt(quantity),
        createdById: userId,
      },
    });

    const updatedStock = await prisma.stock.update({
      where: { productId },
      data: {
        quantity: { increment: parseInt(quantity) },
      },
    });

    const stockMovement = await prisma.stockMovement.create({
      data: {
        productId,
        quantity: parseInt(quantity),
        type: "IN",
        createdById: userId,
      },
    });
    return res.status(201).json(newStockIn);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getStockIns(req, res) {
  const userId = req.user.id;
  try {
    const stockIns = await prisma.stockIn.findMany({
      where: {
        product: {
          createdById: userId,
        },
      },
      include: {
        product: true,
        createdBy: true,
      },
    });
    return res.status(200).json(stockIns);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
