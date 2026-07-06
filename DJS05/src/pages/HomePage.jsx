import { useMemo } from "react";
import Header from "../components/Header.jsx";
import Controls from "../components/Controls.jsx";
import PodcastGrid from "../components/PodcastGrid.jsx";
import Pagination from "../components/Pagination.jsx";
import { getVisiblePodcasts } from "../utils/filterPodcasts.js";
import { genres } from "../data.js";

/** How many podcasts to show per page. */
const PAGE_SIZE = 8;

/**
 * HomePage - the listing page with search, filter, sort and pagination.
 * All of its state is passed in from App so it is preserved across navigation.
 *
 * @param {Object} props - The homepage state and setters from App.
 * @returns {JSX.Element}
 */
export default function HomePage({
  podcasts,
  loading,
  error,
  search,
  setSearch,
  genre,
  setGenre,
  sort,
  setSort,
  page,
  setPage,
}) {
  // the filtered + sorted list
  const visible = useMemo(
    () => getVisiblePodcasts(podcasts, { search, genre, sort }),
    [podcasts, search, genre, sort]
  );

  const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const pageItems = visible.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <Header />
      <main className="max-w-[1400px] mx-auto px-5 sm:px-8 py-7">
        <Controls
          search={search}
          onSearch={setSearch}
          genre={genre}
          onGenre={setGenre}
          sort={sort}
          onSort={setSort}
          genres={genres}
        />

        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-500">
            <div className="spinner"></div>
            <p>Loading podcasts…</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-lg font-semibold text-gray-800">Something went wrong</p>
            <p className="text-sm text-gray-500">
              Error occurred while fetching podcasts: {error}
            </p>
          </div>
        )}

        {!loading && !error && (
          <>
            <PodcastGrid podcasts={pageItems} genres={genres} />
            <Pagination currentPage={page} pageCount={pageCount} onPageChange={setPage} />
          </>
        )}
      </main>
    </>
  );
}
