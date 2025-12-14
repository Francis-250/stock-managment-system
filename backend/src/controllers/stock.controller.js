import prisma from "../utils/prisma.js";

export async function getStock(req, res) {
  const userId = req.user.id;
  try {
    const stocks = await prisma.stock.findMany({
      where: {
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
    return res.status(200).json(stocks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
