import { useState, useEffect, useMemo } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Filter from "../../components/Filter";
import Pagination from "../../components/Pagination";
import { stockHeaders } from "../../utils/data";
import api from "../../lib/axios";
import StockTable from "../../components/table/StockTable";

export default function Stock() {
  const [collapsed, setCollapsed] = useState(false);
  const [closed, setClosed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStocks() {
      setLoading(true);
      try {
        const response = await api.get("/stocks");
        setStocks(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchStocks();
  }, []);

  const filteredStocks = useMemo(() => {
    if (!searchTerm.trim()) return stocks;

    const lowerSearchTerm = searchTerm.toLowerCase();
    return stocks.filter(
      (stock) =>
        stock.product?.name?.toLowerCase().includes(lowerSearchTerm) ||
        stock.product?.sku?.toLowerCase().includes(lowerSearchTerm) ||
        stock.product?.category?.name?.toLowerCase().includes(lowerSearchTerm)
    );
  }, [stocks, searchTerm]);

  const totalPages = Math.ceil(filteredStocks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedStocks = filteredStocks.slice(startIndex, endIndex);

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
            Stock
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your Stock here.
          </p>
          <Filter
            placeholder="Search stock..."
            button="Refresh Stock"
            form={false}
            setForm={() => {}}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-gray-600 dark:text-gray-400">
                Loading stock...
              </div>
            </div>
          ) : (
            <>
              <StockTable headers={stockHeaders} data={paginatedStocks} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                startIndex={startIndex}
                endIndex={endIndex}
                totalItems={filteredStocks.length}
                isMobile={false}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
