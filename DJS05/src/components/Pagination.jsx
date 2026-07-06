/**
 * Page navigation: Previous / numbered pages / Next.
 * Renders nothing when there is only one page.
 *
 * @param {Object} props
 * @param {number} props.currentPage - The active page (1-based).
 * @param {number} props.pageCount - Total number of pages.
 * @param {(page: number) => void} props.onPageChange - Called with the new page.
 * @returns {JSX.Element|null}
 */
export default function Pagination({ currentPage, pageCount, onPageChange }) {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const baseBtn =
    "min-w-9 h-9 px-3 rounded-lg border text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <nav className="flex items-center justify-center flex-wrap gap-2 mt-10" aria-label="Pagination">
      <button
        className={`${baseBtn} bg-white border-gray-300 text-gray-700 hover:bg-gray-50`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={
            page === currentPage
              ? `${baseBtn} bg-gray-900 border-gray-900 text-white`
              : `${baseBtn} bg-white border-gray-300 text-gray-700 hover:bg-gray-50`
          }
        >
          {page}
        </button>
      ))}

      <button
        className={`${baseBtn} bg-white border-gray-300 text-gray-700 hover:bg-gray-50`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pageCount}
      >
        Next
      </button>
    </nav>
  );
}
