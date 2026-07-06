/**
 * Shortens a description to a readable length.
 * @param {string} text
 * @param {number} [max=140]
 * @returns {string}
 */
function shorten(text, max = 140) {
  if (!text) return "";
  return text.length > max ? text.slice(0, max).trimEnd() + "…" : text;
}

/**
 * A single episode row: number badge / season image, title and short description.
 *
 * @param {Object} props
 * @param {number} props.number - The episode number.
 * @param {Object} props.episode - The episode object (title, description).
 * @param {string} [props.seasonImage] - The season cover, used as the thumbnail.
 * @param {number} props.seasonNumber - The season number (for the fallback badge).
 * @returns {JSX.Element}
 */
export default function EpisodeCard({ number, episode, seasonImage, seasonNumber }) {
  return (
    <div className="flex gap-4 bg-gray-50 border border-gray-100 rounded-xl p-4">
      {/* thumbnail */}
      <div className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-[#9aa1ac] flex items-center justify-center text-white text-xs font-semibold">
        S{seasonNumber}
        {seasonImage && (
          <img
            src={seasonImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}
      </div>

      {/* text */}
      <div className="min-w-0">
        <h4 className="font-semibold text-gray-900 mb-1">
          Episode {number}: {episode.title}
        </h4>
        <p className="text-sm text-gray-500 leading-relaxed">{shorten(episode.description)}</p>
      </div>
    </div>
  );
}
