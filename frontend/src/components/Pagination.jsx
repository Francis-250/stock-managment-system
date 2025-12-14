import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  startIndex,
  endIndex,
  totalItems,
  isMobile,
}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mt-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div className="text-sm text-gray-700 dark:text-gray-400 mb-4 md:mb-0">
        Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
        {totalItems} entries
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-md disabled:opacity-50 flex items-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft size={16} className="mr-1" /> Previous
        </button>

        {/* Conditional pagination display */}
        {isMobile ? (
          <span className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-600 rounded-md">
            {currentPage} / {totalPages}
          </span>
        ) : (
          Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {page}
            </button>
          ))
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-md disabled:opacity-50 flex items-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Next <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
}
