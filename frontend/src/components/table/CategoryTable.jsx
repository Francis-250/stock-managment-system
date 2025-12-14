import { useState } from "react";
import { toast } from "sonner";
import api from "../../lib/axios";

export default function CategoryTable({ headers, data }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleEditClick = (category) => {
    setEditingId(category.id);
    setEditForm({ ...category });
  };

  const handleSaveClick = async () => {
    try {
      await api.put(`/categories/${editingId}`, editForm);
      toast.success("Category updated successfully");
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
      await api.delete(`/categories/${id}`);
      toast.success("Category deleted successfully");
      window.location.reload();
    } catch (error) {
      console.log("Login error:", error);
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
          </tr>
        </thead>
        <tbody>
          {data.map((category, i) => (
            <tr
              key={category.id || i}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              {editingId === category.id ? (
                <>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={editForm.name || ""}
                      onChange={(e) => handleInputChange(e, "name")}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={editForm.description || ""}
                      onChange={(e) => handleInputChange(e, "description")}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                    />
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
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    {category.description}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEditClick(category)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDelete(category.id)}
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
