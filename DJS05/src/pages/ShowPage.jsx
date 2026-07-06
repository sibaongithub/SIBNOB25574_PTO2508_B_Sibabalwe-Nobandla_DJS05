import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import SeasonNav from "../components/SeasonNav.jsx";
import { fetchShow } from "../api/fetchShow.js";
import { formatDate } from "../utils/formatDate.js";
import { genres as genreList } from "../data.js";

/**
 * Turns a show's genres into readable titles. The show endpoint may return
 * genres as titles (strings) or ids (numbers), so this handles both.
 * @param {(string|number)[]} showGenres
 * @returns {string[]}
 */
function genreTitles(showGenres) {
  if (!showGenres) return [];
  return showGenres
    .map((g) =>
      typeof g === "number" ? (genreList.find((x) => x.id === g) || {}).title : g
    )
    .filter(Boolean);
}

/**
 * ShowPage - the dynamic detail page for a single show (route: /show/:id).
 * Fetches the show by the id in the URL and handles loading / error / empty.
 *
 * @returns {JSX.Element}
 */
export default function ShowPage() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchShow(id, setShow, setError, setLoading);
  }, [id]);

  const totalEpisodes = show?.seasons
    ? show.seasons.reduce((sum, s) => sum + (s.episodes ? s.episodes.length : 0), 0)
    : 0;

  return (
    <>
      <Header showBackButton />
      <main className="max-w-[1100px] mx-auto px-5 sm:px-8 py-7">
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-500">
            <div className="spinner"></div>
            <p>Loading show…</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-lg font-semibold text-gray-800">Something went wrong</p>
            <p className="text-sm text-gray-500">Error loading this show: {error}</p>
          </div>
        )}

        {!loading && !error && !show && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-lg font-semibold text-gray-800">Show not found</p>
          </div>
        )}

        {!loading && !error && show && (
          <>
            {/* top detail card */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-8 mb-10">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="relative w-full sm:w-64 h-64 flex-shrink-0 rounded-xl overflow-hidden bg-[#9aa1ac] flex items-center justify-center text-white font-medium">
                  Podcast Cover Image
                  {show.image && (
                    <img
                      src={show.image}
                      alt={`${show.title} cover`}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">{show.title}</h1>
                  <p className="text-gray-600 leading-relaxed mb-6">{show.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Genres</p>
                      <div className="flex flex-wrap gap-2">
                        {genreTitles(show.genres).map((title) => (
                          <span
                            key={title}
                            className="bg-[#f1f3f5] text-gray-800 text-sm px-3.5 py-1 rounded-full"
                          >
                            {title}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Last Updated</p>
                      <p className="text-gray-800">{formatDate(show.updated)}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Total Seasons</p>
                      <p className="text-gray-800">
                        {show.seasons ? show.seasons.length : 0} Seasons
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Total Episodes</p>
                      <p className="text-gray-800">{totalEpisodes} Episodes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* seasons + episodes */}
            <SeasonNav seasons={show.seasons} />
          </>
        )}
      </main>
    </>
  );
}
