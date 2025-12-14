import prisma from "../utils/prisma.js";

export async function createStockOut(req, res) {
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

    const currentStock = await prisma.stock.findUnique({
      where: { productId },
    });
    if (!currentStock || currentStock.quantity < parseInt(quantity)) {
      return res.status(400).json({ message: "Insufficient stock available" });
    }

    const newStockOut = await prisma.stockOut.create({
      data: {
        productId,
        quantity: parseInt(quantity),
        createdById: userId,
      },
    });

    const updatedStock = await prisma.stock.update({
      where: { productId },
      data: {
        quantity: { decrement: parseInt(quantity) },
      },
    });

    const stockMovement = await prisma.stockMovement.create({
      data: {
        productId,
        quantity: parseInt(quantity),
        type: "OUT",
        createdById: userId,
      },
    });
    return res.status(201).json(newStockOut);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getStockOuts(req, res) {
  const userId = req.user.id;
  try {
    const stockOuts = await prisma.stockOut.findMany({
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
    return res.status(200).json(stockOuts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
