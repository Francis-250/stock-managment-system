import { useState, useEffect } from "react";
import { toast } from "sonner";
import api from "../../lib/axios";

export default function ProductTable({ headers, data, categories }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditForm({ ...product, categoryId: product.category?.id || "" });
  };

  const handleSaveClick = async () => {
    try {
      await api.put(`/products/${editingId}`, {
        name: editForm.name,
        description: editForm.description,
        costPrice: editForm.costPrice,
        sellingPrice: editForm.sellingPrice,
        categoryId: editForm.categoryId,
        status: editForm.status,
      });
      toast.success("Product updated successfully");
      window.location.reload();
    } catch (error) {
      console.log("Update error:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      toast.error(errorMessage);
    }
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  const handleInputChange = (e, field) => {
    setEditForm({
      ...editForm,
      [field]: e.target.value,
    });
  };

  const handleDelete = (id) => async () => {
    try {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted successfully");
      window.location.reload();
    } catch (error) {
      console.log("Delete error:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headers.map((header, i) => (
              <th scope="col" className="px-6 py-3" key={i}>
                {header.label}
              </th>
            ))}
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((product, i) => (
            <tr
              key={product.id || i}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              {editingId === product.id ? (
                <>
                  <td className="px-6 py-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={editForm.name || ""}
                      onChange={(e) => handleInputChange(e, "name")}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={editForm.categoryId || ""}
                      onChange={(e) => handleInputChange(e, "categoryId")}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                    >
                      <option value="">Select category</option>
                      {categories?.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      step="0.01"
                      value={editForm.costPrice || ""}
                      onChange={(e) => handleInputChange(e, "costPrice")}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      step="0.01"
                      value={editForm.sellingPrice || ""}
                      onChange={(e) => handleInputChange(e, "sellingPrice")}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">
                    {product.stock?.quantity || 0}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={editForm.status || "ACTIVE"}
                      onChange={(e) => handleInputChange(e, "status")}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={handleSaveClick}
                      className="font-medium text-green-600 dark:text-green-500 hover:underline mr-3"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelClick}
                      className="font-medium text-gray-600 dark:text-gray-400 hover:underline"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-6 py-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {product.category?.name}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ${product.costPrice}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ${product.sellingPrice}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {product.stock?.quantity || 0}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        product.status === "ACTIVE"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDelete(product.id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
