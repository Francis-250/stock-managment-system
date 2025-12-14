import {
  BarChart3,
  Box,
  Download,
  Grid,
  Home,
  Package,
  Upload,
} from "lucide-react";

export const links = [
  { name: "Dashboard", url: "/admin", icon: Home },
  { name: "Category", url: "/admin/category", icon: Grid },
  { name: "Product", url: "/admin/product", icon: Package },
  { name: "Stock", url: "/admin/stock", icon: Box },
  { name: "Stock In", url: "/admin/stockin", icon: Download },
  { name: "Stock Out", url: "/admin/stockout", icon: Upload },
  { name: "Report", url: "/admin/report", icon: BarChart3 },
];

export const categoryHeaders = [
  { label: "Name", key: "name" },
  { label: "Description", key: "description" },
  { label: "Actions", key: "actions" },
];

export const productHeaders = [
  { label: "Product", key: "product" },
  { label: "SKU", key: "sku" },
  { label: "Name", key: "name" },
  { label: "Category", key: "category" },
  { label: "Cost Price", key: "costPrice" },
  { label: "Selling Price", key: "sellingPrice" },
  { label: "Stock", key: "stock" },
  { label: "Status", key: "status" },
];

export const stockHeaders = [
  { label: "Product", key: "product" },
  { label: "SKU", key: "sku" },
  { label: "Category", key: "category" },
  { label: "Quantity", key: "quantity" },
  { label: "Last Updated", key: "updatedAt" },
];

export const stockInHeaders = [
  { label: "Product", key: "product" },
  { label: "Quantity", key: "quantity" },
  { label: "Created By", key: "createdBy" },
  { label: "Date", key: "createdAt" },
];

export const stockOutHeaders = [
  { label: "Product", key: "product" },
  { label: "Quantity", key: "quantity" },
  { label: "Created By", key: "createdBy" },
  { label: "Date", key: "createdAt" },
];

export const reportHeaders = [
  { label: "Product", key: "product" },
  { label: "SKU", key: "sku" },
  { label: "Quantity", key: "quantity" },
  { label: "Type", key: "type" },
  { label: "Created By", key: "createdBy" },
  { label: "Date", key: "createdAt" },
];
