import { useState, useEffect, useMemo } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Filter from "../../components/Filter";
import Pagination from "../../components/Pagination";
import { reportHeaders } from "../../utils/data";
import api from "../../lib/axios";
import ReportTable from "../../components/table/ReportTable";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

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

  const downloadReport = () => {
    try {
      const headers = [
        "Date",
        "Product",
        "SKU",
        "Type",
        "Quantity",
        "Unit Price",
        "Total Amount",
        "Reference",
        "Created By",
      ];
      const csvData = filteredReports.map((report) => [
        new Date(report.createdAt).toLocaleString(),
        report.product?.name || "N/A",
        report.product?.sku || "N/A",
        report.type || "N/A",
        report.quantity || 0,
        report.unitPrice || 0,
        report.quantity * report.unitPrice || 0,
        report.reference || "N/A",
        `${report.createdBy?.firstName || ""} ${
          report.createdBy?.lastName || ""
        }`.trim() || "N/A",
      ]);

      const csvContent = [
        headers.join(","),
        ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `stock_movement_report_${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Report downloaded successfully!");
    } catch (error) {
      console.error("Error downloading report:", error);
      toast.error("Failed to download report");
    }
  };

  const exportToPDF = () => {
    try {
      const doc = new jsPDF();

      // Add title
      doc.setFontSize(18);
      doc.setTextColor(40);
      doc.text("Stock Movement Report", 14, 22);

      // Add date
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
      doc.text(`Total Records: ${filteredReports.length}`, 14, 36);

      // Prepare table data
      const tableData = filteredReports.map((report) => [
        new Date(report.createdAt).toLocaleDateString(),
        report.product?.name || "N/A",
        report.product?.sku || "N/A",
        report.type || "N/A",
        report.quantity || 0,
        `$${(report.unitPrice || 0).toFixed(2)}`,
        `$${(report.quantity * report.unitPrice || 0).toFixed(2)}`,
        report.reference || "N/A",
        `${report.createdBy?.firstName || ""} ${
          report.createdBy?.lastName || ""
        }`.trim() || "N/A",
      ]);

      // Add table
      autoTable(doc, {
        startY: 42,
        head: [
          [
            "Date",
            "Product",
            "SKU",
            "Type",
            "Qty",
            "Price",
            "Total",
            "Ref",
            "By",
          ],
        ],
        body: tableData,
        theme: "striped",
        headStyles: {
          fillColor: [59, 130, 246],
          textColor: 255,
          fontSize: 9,
          fontStyle: "bold",
        },
        bodyStyles: {
          fontSize: 8,
          textColor: 50,
        },
        alternateRowStyles: {
          fillColor: [245, 247, 250],
        },
        margin: { top: 42 },
        styles: {
          cellPadding: 3,
          overflow: "linebreak",
        },
        columnStyles: {
          0: { cellWidth: 22 },
          1: { cellWidth: 35 },
          2: { cellWidth: 20 },
          3: { cellWidth: 18 },
          4: { cellWidth: 12 },
          5: { cellWidth: 18 },
          6: { cellWidth: 18 },
          7: { cellWidth: 20 },
          8: { cellWidth: 25 },
        },
      });

      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(
          `Page ${i} of ${pageCount}`,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: "center" }
        );
      }

      // Save PDF
      doc.save(
        `stock_movement_report_${new Date().toISOString().split("T")[0]}.pdf`
      );

      toast.success("PDF report exported successfully!");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast.error("Failed to export PDF report");
    }
  };

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
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Stock Movement Report
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                View stock movement history here.
              </p>
            </div>
            <button
              onClick={downloadReport}
              disabled={filteredReports.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
            >
              <Download size={18} />
              Download CSV
            </button>
          </div>
          <Filter
            placeholder="Search reports..."
            button="Export PDF"
            form={filteredReports.length > 0}
            setForm={exportToPDF}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-gray-600 dark:text-gray-400">
                Loading reports...
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </main>
    </div>
  );
}
