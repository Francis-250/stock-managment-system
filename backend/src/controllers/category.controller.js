import prisma from "../utils/prisma.js";

export async function createCategory(req, res) {
  const { name, description } = req.body;
  const userId = req.user.id;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  try {
    const existingCategory = await prisma.category.findUnique({
      where: { name_createdById: { name, createdById: userId } },
    });
    if (existingCategory) {
      return res.status(409).json({ message: "Category already exists" });
    }
    const newCategory = await prisma.category.create({
      data: { name, description, createdById: userId },
    });
    return res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getCategories(req, res) {
  const userId = req.user.id;
  try {
    const categories = await prisma.category.findMany({
      where: { createdById: userId },
    });
    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getCategoryById(req, res) {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const category = await prisma.category.findFirst({
      where: { id, createdById: userId },
    });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json(category);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateCategory(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;
  const userId = req.user.id;

  try {
    const existingCategory = await prisma.category.findFirst({
      where: { id, createdById: userId },
    });
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name, description },
    });
    return res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteCategory(req, res) {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const existingCategory = await prisma.category.findFirst({
      where: { id, createdById: userId },
    });
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    await prisma.category.delete({
      where: { id },
    });
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
