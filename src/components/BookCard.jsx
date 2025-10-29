import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function BookCard({ book, isFavorite = false, onToggleFavorite = () => {} }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://placehold.co/200x300?text=No+Cover";

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer animate-fade-in">
      <div className="relative">
        <img
          src={coverUrl}
          alt={book.title}
          className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Favorite button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(book);
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm transition-colors text-accent z-20"
        >
          {isFavorite ? (
            <AiFillHeart className="w-5 h-5 text-pink-600" />
          ) : (
            <AiOutlineHeart className="w-5 h-5" />
          )}
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {book.first_publish_year || "N/A"}
        </p>
      </div>
    </div>
  );
}

export default BookCard;
