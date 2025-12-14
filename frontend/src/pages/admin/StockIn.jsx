import { useState, useEffect, useMemo } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Filter from "../../components/Filter";
import Pagination from "../../components/Pagination";
import { stockInHeaders } from "../../utils/data";
import api from "../../lib/axios";
import StockInTable from "../../components/table/StockInTable";
import StockInForm from "../../components/form/StockInForm";

export default function StockIn() {
  const [collapsed, setCollapsed] = useState(false);
  const [closed, setClosed] = useState(false);
  const [form, setForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [stockIns, setStockIns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStockIns() {
      setLoading(true);
      try {
        const response = await api.get("/stock-ins");
        setStockIns(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchStockIns();
  }, []);

  const filteredStockIns = useMemo(() => {
    if (!searchTerm.trim()) return stockIns;

    const lowerSearchTerm = searchTerm.toLowerCase();
    return stockIns.filter(
      (stockIn) =>
        stockIn.product?.name?.toLowerCase().includes(lowerSearchTerm) ||
        stockIn.createdBy?.firstName?.toLowerCase().includes(lowerSearchTerm) ||
        stockIn.createdBy?.lastName?.toLowerCase().includes(lowerSearchTerm)
    );
  }, [stockIns, searchTerm]);

  const totalPages = Math.ceil(filteredStockIns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedStockIns = filteredStockIns.slice(startIndex, endIndex);

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
            Stock In
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your Stock In here.
          </p>
          <Filter
            placeholder="Search stock in..."
            button="Add Stock In"
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
                Loading stock in...
              </div>
            </div>
          ) : (
            <>
              <StockInTable headers={stockInHeaders} data={paginatedStockIns} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                startIndex={startIndex}
                endIndex={endIndex}
                totalItems={filteredStockIns.length}
                isMobile={false}
              />
            </>
          )}
        </div>
        {form && <StockInForm form={form} setForm={setForm} />}
      </main>
    </div>
  );
}
