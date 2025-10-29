import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto flex items-center justify-between bg-white/90 backdrop-blur-md rounded-full shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all"
    >
      <input
        type="text"
        placeholder="Search books by title..."
        className="grow px-6 py-3 text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent rounded-l-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="mx-0"></div>
      <button
        type="submit"
        className="flex items-center gap-2 btn-accent px-6 py-3 rounded-full hover:opacity-95 transition-colors font-medium"
      >
        <FiSearch className="text-lg" />
        Search
      </button>
    </form>
  );
}

export default SearchBar;
