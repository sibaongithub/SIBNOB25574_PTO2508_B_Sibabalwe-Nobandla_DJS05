/**
 * The controls toolbar: a search box, a genre filter, and a sort dropdown.
 * It is a controlled component — App owns the values and passes change handlers.
 *
 * @param {Object} props
 * @param {string} props.search - Current search text.
 * @param {(value: string) => void} props.onSearch - Updates the search text.
 * @param {string} props.genre - Currently selected genre id (or "all").
 * @param {(value: string) => void} props.onGenre - Updates the selected genre.
 * @param {string} props.sort - Current sort option.
 * @param {(value: string) => void} props.onSort - Updates the sort option.
 * @param {Object[]} props.genres - The genre list for the dropdown options.
 * @returns {JSX.Element}
 */
export default function Controls({ search, onSearch, genre, onGenre, sort, onSort, genres }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-7">
      {/* search */}
      <div className="relative flex-1 max-w-md">
        <svg
          className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path strokeLinecap="round" d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search podcasts…"
          className="w-full bg-white border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-[15px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex items-center gap-3">
        <span className="text-[15px] font-medium text-gray-700">Filter by:</span>

        {/* genre filter */}
        <select
          value={genre}
          onChange={(e) => onGenre(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-3.5 py-2 text-[15px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
        >
          <option value="all">All Genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.title}
            </option>
          ))}
        </select>

        {/* sort */}
        <select
          value={sort}
          onChange={(e) => onSort(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-3.5 py-2 text-[15px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
        >
          <option value="newest">Newest</option>
          <option value="title-az">Title A–Z</option>
          <option value="title-za">Title Z–A</option>
        </select>
      </div>
    </div>
  );
}
