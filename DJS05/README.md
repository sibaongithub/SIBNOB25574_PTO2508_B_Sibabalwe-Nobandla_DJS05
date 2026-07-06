# DJS05 – Show Detail Page with Routing & Navigation

## Overview
This builds on the DJS04 podcast app by adding **routing**. Clicking a podcast
now opens its own **show detail page** at a unique URL, where you can read the
full description and browse seasons and episodes. Your search, filter, sort and
page on the homepage are **preserved** when you navigate to a show and back.

APIs used:
- `https://podcast-api.netlify.app/` — the list of previews (homepage)
- `https://podcast-api.netlify.app/id/<ID>` — one show with seasons + episodes

---

## Features
- **Dynamic routing** with React Router: `/` for the homepage, `/show/:id` for a
  show. Each show has its own URL.
- **Show detail page** showing the cover image, title, description, genre tags,
  last updated date, total seasons and total episodes.
- **Season navigation**: a dropdown switches between seasons and lists that
  season's episodes (episode number, title, season image, shortened description).
- **Loading, error and empty states** on both the homepage and the show page
  (including a "Show not found" message).
- **State preservation**: search, genre filter, sort and page are kept when you
  go back to the homepage, because that state lives in `App`, above the router.
- **Responsive** layout across mobile, tablet and desktop.

---

## Tech Used
- **React** functional components (`useState`, `useEffect`, `useMemo`)
- **React Router** (`react-router-dom`) for routing
- **Fetch API** for the data
- **Tailwind CSS** (via CDN) for styling
- **Vite** as the dev server / build tool

---

## Project Structure
```
djs05/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── README.md
└── src/
    ├── main.jsx            wraps the app in <BrowserRouter>
    ├── App.jsx             defines the routes + owns the preserved homepage state
    ├── data.js             the genre list
    ├── index.css           base styles + spinner
    ├── api/
    │   ├── fetchPodcasts.js   the list of shows
    │   └── fetchShow.js       one show by id
    ├── pages/
    │   ├── HomePage.jsx       the listing (search / filter / sort / pagination)
    │   └── ShowPage.jsx       the dynamic detail page (route: /show/:id)
    ├── components/
    │   ├── Header.jsx         navbar (+ optional back button)
    │   ├── Controls.jsx       search + genre + sort
    │   ├── PodcastCard.jsx    a card, links to its show page
    │   ├── PodcastGrid.jsx    the responsive grid
    │   ├── Pagination.jsx     page controls
    │   ├── SeasonNav.jsx      season dropdown + episode list
    │   └── EpisodeCard.jsx    one episode row
    └── utils/
        ├── formatDate.js       formats dates
        └── filterPodcasts.js   search / filter / sort logic
```

### How state is preserved
The homepage state (search, genre, sort, page) lives in **`App.jsx`**, which sits
*above* the router. When you open a show, `App` stays mounted, so when you come
back to `/` the homepage shows exactly what you left. The show page fetches its
own data based on the `:id` in the URL.

---

## How to Run
1. Open the `djs05` folder in your terminal.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open the local address Vite prints (usually `http://localhost:5173`).

To make a production build: `npm run build`, then `npm run preview`.

---

## Known Limitations
- The API doesn't provide episode duration or per-episode dates, so those aren't
  shown (the app displays the episode number, title, season image and a shortened
  description, which is what the API returns).
- Genre titles come from the local `data.js` mapping, as recommended by the brief.

---

## Deliverables
- Homepage with clickable shows that navigate to detail pages, with filters and
  search preserved on return.
- Dynamic show detail page (title, image, description, genres, last updated).
- Season navigation with per-season episode lists.
- Loading, error and empty states, JSDoc comments, and a responsive layout.
