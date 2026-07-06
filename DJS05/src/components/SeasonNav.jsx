import { useState } from "react";
import EpisodeCard from "./EpisodeCard.jsx";

/**
 * Season navigation. Shows a dropdown to switch between seasons, then lists the
 * episodes of the selected season (so users don't have to scroll through all
 * seasons at once).
 *
 * @param {Object} props
 * @param {Object[]} props.seasons - The show's seasons (each with episodes).
 * @returns {JSX.Element}
 */
export default function SeasonNav({ seasons }) {
  const [current, setCurrent] = useState(0);

  if (!seasons || seasons.length === 0) {
    return <p className="text-gray-500">No seasons available for this show.</p>;
  }

  const season = seasons[current];
  const seasonNumber = season.season ?? current + 1;
  const episodeCount = season.episodes ? season.episodes.length : 0;

  return (
    <section>
      {/* header row: heading + season dropdown */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-900">Current Season</h2>
        <select
          value={current}
          onChange={(e) => setCurrent(Number(e.target.value))}
          className="bg-white border border-gray-300 rounded-lg px-3.5 py-2 text-[15px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
        >
          {seasons.map((s, i) => (
            <option key={i} value={i}>
              {s.title || `Season ${s.season ?? i + 1}`}
            </option>
          ))}
        </select>
      </div>

      {/* selected season summary */}
      <div className="flex gap-5 items-center bg-white border border-gray-100 rounded-2xl p-5 mb-5 shadow-sm">
        <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-[#9aa1ac] flex items-center justify-center text-white text-xs font-medium text-center px-1">
          Season {seasonNumber} Cover
          {season.image && (
            <img
              src={season.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {season.title || `Season ${seasonNumber}`}
          </h3>
          <p className="text-sm text-gray-500">
            {episodeCount} episode{episodeCount === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      {/* episode list */}
      <div className="space-y-3">
        {(season.episodes || []).map((episode, i) => (
          <EpisodeCard
            key={i}
            number={episode.episode ?? i + 1}
            episode={episode}
            seasonImage={season.image}
            seasonNumber={seasonNumber}
          />
        ))}
      </div>
    </section>
  );
}
