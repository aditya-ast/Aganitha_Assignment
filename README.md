# Aganitha Assignment — React + Vite

This repository contains a small React app bootstrapped with Vite. It demonstrates a simple book search / listing UI built with React, Vite, and TailwindCSS (already included in project dependencies).

Main features
- Search bar to filter books
- Reusable `BookCard` component for presenting book data
- Responsive layout and minimal styling with Tailwind

Prerequisites
- Node.js 16+ and npm (or Yarn/PNPM)

Quick start
1. Install dependencies

	npm install

2. Start the dev server with Vite

	npm run dev

	Then open http://localhost:5173 in your browser (Vite will print the exact URL when it starts).

Build for production

	npm run build

Preview the production build locally

	npm run preview

Lint the project

	npm run lint

Available scripts (from `package.json`)
- `dev` — starts Vite dev server with HMR
- `build` — builds the production bundle
- `preview` — serves the production build locally
- `lint` — runs ESLint across the project

Project structure (important files)

- `index.html` — Vite entry html
- `src/main.jsx` — app entry (React + Vite setup)
- `src/App.jsx` — root application component
- `src/components/BookCard.jsx` — component that renders a single book
- `src/components/SearchBar.jsx` — component for searching/filtering
- `src/index.css`, `src/App.css` — styles (Tailwind + local styles)
- `public/` — static assets served by Vite

Notes and tips
- If you add Tailwind utilities or change the Tailwind config, restart the dev server if styles don't show up immediately.
- To add new pages or routes, consider adding React Router and creating a `src/pages/` folder.

Contributing
- Feel free to open issues or submit PRs. Keep changes small and focused. Add tests where appropriate.

Author
- Aditya Jadon

License
- ISC

Acknowledgements
- This project was created using the Vite + React template and includes ESLint and Tailwind tooling.
