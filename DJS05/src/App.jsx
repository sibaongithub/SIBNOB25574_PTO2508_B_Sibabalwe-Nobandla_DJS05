import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ShowPage from "./pages/ShowPage.jsx";
import { fetchPodcasts } from "./api/fetchPodcasts.js";

/**
 * App - sets up the routes and owns the homepage state.
 *
 * The podcast list and the search/filter/sort/page values live here, ABOVE the
 * router, so they are preserved when the user opens a show and navigates back.
 *
 * @returns {JSX.Element}
 */
export default function App() {
  // podcast list (fetched once, shared with the homepage)
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // homepage ui state (kept here so it survives navigation to a show and back)
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPodcasts(setPodcasts, setError, setLoading);
  }, []);

  // reset to page 1 whenever the search/filter/sort changes (not on navigation)
  useEffect(() => {
    setPage(1);
  }, [search, genre, sort]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            podcasts={podcasts}
            loading={loading}
            error={error}
            search={search}
            setSearch={setSearch}
            genre={genre}
            setGenre={setGenre}
            sort={sort}
            setSort={setSort}
            page={page}
            setPage={setPage}
          />
        }
      />
      <Route path="/show/:id" element={<ShowPage />} />
    </Routes>
  );
}
