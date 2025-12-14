import prisma from "../utils/prisma.js";

export async function lowStockReport(req, res) {
  const userId = req.user.id;
  try {
    const { threshold = 10 } = req.query;
    const lowStockProducts = await prisma.stock.findMany({
      where: {
        quantity: {
          lte: parseInt(threshold),
        },
        product: {
          createdById: userId,
        },
      },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
    });
    return res.status(200).json(lowStockProducts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function stockMovementReport(req, res) {
  const userId = req.user.id;
  try {
    const { startDate, endDate, type, productId } = req.query;
    const where = {
      product: {
        createdById: userId,
      },
    };

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate);
      }
    }

    if (type) {
      where.type = type;
    }

    if (productId) {
      where.productId = productId;
    }

    const movements = await prisma.stockMovement.findMany({
      where,
      include: {
        product: {
          include: {
            category: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(movements);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
