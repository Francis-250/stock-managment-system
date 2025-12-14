import { useState, useEffect, useMemo } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Filter from "../../components/Filter";
import Pagination from "../../components/Pagination";
import { reportHeaders } from "../../utils/data";
import api from "../../lib/axios";
import ReportTable from "../../components/table/ReportTable";

export default function Report() {
  const [collapsed, setCollapsed] = useState(false);
  const [closed, setClosed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      setLoading(true);
      try {
        const response = await api.get("/reports");
        setReports(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  const filteredReports = useMemo(() => {
    if (!searchTerm.trim()) return reports;

    const lowerSearchTerm = searchTerm.toLowerCase();
    return reports.filter(
      (report) =>
        report.product?.name?.toLowerCase().includes(lowerSearchTerm) ||
        report.product?.sku?.toLowerCase().includes(lowerSearchTerm) ||
        report.type?.toLowerCase().includes(lowerSearchTerm) ||
        report.createdBy?.firstName?.toLowerCase().includes(lowerSearchTerm) ||
        report.createdBy?.lastName?.toLowerCase().includes(lowerSearchTerm)
    );
  }, [reports, searchTerm]);

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedReports = filteredReports.slice(startIndex, endIndex);

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
            Stock Movement Report
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View stock movement history here.
          </p>
          <Filter
            placeholder="Search reports..."
            button="Export Report"
            form={false}
            setForm={() => {}}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <ReportTable headers={reportHeaders} data={paginatedReports} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            startIndex={startIndex}
            endIndex={endIndex}
            totalItems={filteredReports.length}
            isMobile={false}
          />
        </div>
      </main>
    </div>
  );
}
