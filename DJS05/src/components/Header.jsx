import { Link } from "react-router-dom";

/**
 * The top navigation bar. On detail pages it can show a back button that
 * returns to the homepage (state is preserved, so filters/search come back).
 *
 * @param {Object} props
 * @param {boolean} [props.showBackButton=false] - Whether to show the back arrow.
 * @returns {JSX.Element}
 */
export default function Header({ showBackButton = false }) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <Link
              to="/"
              aria-label="Back to home"
              className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          )}
          <Link to="/" className="flex items-center gap-2.5 font-bold text-xl text-gray-900">
            <svg
              className="w-7 h-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="10" r="3" />
              <path d="M7 20.662V19a5 5 0 0 1 10 0v1.662" />
            </svg>
            PodcastApp
          </Link>
        </div>
        <div className="flex items-center gap-5 text-gray-600">
          <button aria-label="Search" className="hover:text-gray-900">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="m21 21-4.35-4.35" />
            </svg>
          </button>
          <div className="w-8 h-8 rounded-full bg-[#9aa1ac]" role="img" aria-label="Account" />
        </div>
      </div>
    </header>
  );
}
