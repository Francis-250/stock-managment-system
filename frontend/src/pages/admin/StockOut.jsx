import { useState, useEffect, useMemo } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Filter from "../../components/Filter";
import Pagination from "../../components/Pagination";
import { stockOutHeaders } from "../../utils/data";
import api from "../../lib/axios";
import StockOutTable from "../../components/table/StockOutTable";
import StockOutForm from "../../components/form/StockOutForm";

export default function Stockout() {
  const [collapsed, setCollapsed] = useState(false);
  const [closed, setClosed] = useState(false);
  const [form, setForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [stockOuts, setStockOuts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStockOuts() {
      setLoading(true);
      try {
        const response = await api.get("/stock-outs");
        setStockOuts(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchStockOuts();
  }, []);

  const filteredStockOuts = useMemo(() => {
    if (!searchTerm.trim()) return stockOuts;

    const lowerSearchTerm = searchTerm.toLowerCase();
    return stockOuts.filter(
      (stockOut) =>
        stockOut.product?.name?.toLowerCase().includes(lowerSearchTerm) ||
        stockOut.createdBy?.firstName
          ?.toLowerCase()
          .includes(lowerSearchTerm) ||
        stockOut.createdBy?.lastName?.toLowerCase().includes(lowerSearchTerm)
    );
  }, [stockOuts, searchTerm]);

  const totalPages = Math.ceil(filteredStockOuts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedStockOuts = filteredStockOuts.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  if (loading) return <div>Loading...</div>;

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
            Stock Out
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your Stock Out here.
          </p>
          <Filter
            placeholder="Search stock out..."
            button="Add Stock Out"
            form={form}
            setForm={setForm}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <StockOutTable headers={stockOutHeaders} data={paginatedStockOuts} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            startIndex={startIndex}
            endIndex={endIndex}
            totalItems={filteredStockOuts.length}
            isMobile={false}
          />
        </div>
        {form && <StockOutForm form={form} setForm={setForm} />}
      </main>
    </div>
  );
}
