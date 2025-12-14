import { useState, useEffect, useMemo } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Filter from "../../components/Filter";
import Pagination from "../../components/Pagination";
import { categoryHeaders } from "../../utils/data";
import CategoryForm from "../../components/form/CategoryForm";
import api from "../../lib/axios";
import CategoryTable from "../../components/table/CategoryTable";

export default function Category() {
  const [collapsed, setCollapsed] = useState(false);
  const [closed, setClosed] = useState(false);
  const [form, setForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return categories;

    const lowerSearchTerm = searchTerm.toLowerCase();
    return categories.filter(
      (category) =>
        category.name?.toLowerCase().includes(lowerSearchTerm) ||
        category.description?.toLowerCase().includes(lowerSearchTerm)
    );
  }, [categories, searchTerm]);

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCategories = filteredCategories.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  return (
    <div className="flex">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        closed={closed}
        setClosed={setClosed}
      />

      <main
        className={`dash-container ${
          collapsed ? "dash-container-ds-collapsed" : "dash-container-ds"
        }`}
      >
        <Header setClosed={setClosed} />

        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Category
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your Category here.
          </p>
          <Filter
            placeholder="Search categories..."
            button="Add Category"
            form={form}
            setForm={setForm}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-gray-600 dark:text-gray-400">
                Loading categories...
              </div>
            </div>
          ) : (
            <>
              <CategoryTable
                headers={categoryHeaders}
                data={paginatedCategories}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                startIndex={startIndex}
                endIndex={endIndex}
                totalItems={filteredCategories.length}
                isMobile={false}
              />
            </>
          )}
        </div>
        {form && <CategoryForm setForm={setForm} form={form} />}
      </main>
    </div>
  );
}
