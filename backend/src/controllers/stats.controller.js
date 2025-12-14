import prisma from "../utils/prisma.js";

export async function TotalItems(req, res) {
  const userId = req.user.id;
  try {
    const productCount = await prisma.product.count({
      where: { createdById: userId },
    });
    const categoryCount = await prisma.category.count({
      where: { createdById: userId },
    });
    const userCount = 1;
    const stockCount = await prisma.stock.count({
      where: {
        product: {
          createdById: userId,
        },
      },
    });

    return res.status(200).json({
      products: productCount,
      categories: categoryCount,
      users: userCount,
      stocks: stockCount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function chartData(req, res) {
  const userId = req.user.id;
  try {
    const stockMovements = await prisma.stockMovement.groupBy({
      by: ["type"],
      where: {
        product: {
          createdById: userId,
        },
      },
      _sum: { quantity: true },
    });
    return res.status(200).json(stockMovements);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function recentActivities(req, res) {
  const userId = req.user.id;
  try {
    const activities = await prisma.stockMovement.findMany({
      where: {
        product: {
          createdById: userId,
        },
      },
      include: {
        product: true,
        createdBy: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });
    return res.status(200).json(activities);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
