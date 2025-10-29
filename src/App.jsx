import React,{ useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import BookCard from "./components/BookCard";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBooks = async (query) => {
    if (!query) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`https://openlibrary.org/search.json?title=${query}`);
      const data = await res.json();

      if (!data.docs || data.docs.length === 0) {
        setError("No books found.");
        setBooks([]);
      } else {
        setBooks(data.docs.slice(0, 10));
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Favorites: stored as array of book objects
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const bookId = (b) => (b && (b.key || `${b.title}-${(b.author_name||[]).join(",")}`)) || "";

  useEffect(() => {
    try {
      const raw = localStorage.getItem("favorites");
      if (raw) setFavorites(JSON.parse(raw));
    } catch (e) {
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (e) {
    }
  }, [favorites]);

  const toggleFavorite = (book) => {
    const id = bookId(book);
    setFavorites((prev) => {
      const exists = prev.find((p) => bookId(p) === id);
      if (exists) return prev.filter((p) => bookId(p) !== id);
      return [book, ...prev];
    });
  };

  const clearFavorites = () => setFavorites([]);

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-6xl text-center">
        {/* Welcome Message */}
        <div className="mb-4 animate-fade-in">
          <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-2 py-2 text-primary">
            👋 Welcome, Alex!
          </p>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Let’s help you find your next favorite book.
          </p>
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-8 drop-shadow-md animate-fade-in title-gradient">
          Book Finder
        </h1>

        {/* Search Bar */}
        <SearchBar onSearch={fetchBooks} />

        {/* Loading Spinner */}
        {loading && (
          <div className="mt-10 flex justify-center items-center animate-fade-in">
            <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="ml-3 text-gray-500">Wait Alex, We Are Searching For Your Required books...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="mt-10 text-red-500 text-center font-medium animate-fade-in">
            {error}
          </p>
        )}

        {/* Empty */}
        {!loading && !error && books.length === 0 && (
          <p className="mt-10 text-gray-400 text-center italic animate-fade-in">
            Try searching for something like “Harry Potter, Dune, ...” 📖
          </p>
        )}

        {/* Books Found */}
        {!loading && !error && books.length > 0 && (
          <div className="mt-10 animate-fade-in">
            {/* Use a responsive flex container so the heading and the favorites toggle sit side-by-side on larger screens
                and stack on very small screens. */}
            <div className="flex flex-col sm:flex-row items-center justify-between max-w-4xl mx-auto gap-4">
              <p className="text-center sm:text-left text-gray-600 font-semibold text-xl mb-0">
                Here are your required books 📖
              </p>

              {/* Show Favorites toggle button */}
              <div className="mb-0">
                <button
                  type="button"
                  onClick={() => setShowFavorites((s) => !s)}
                  className="btn-accent hover:opacity-95 transition-opacity"
                >
                  {showFavorites ? "Hide Favorites" : `Show Favorites (${favorites.length})`}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Favorites Section (toggle-visible) */}
        {showFavorites && (
          <div className="mt-4 text-left animate-fade-in max-w-6xl mx-auto w-full">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-800">Favorites ({favorites.length})</h2>
              <button onClick={clearFavorites} className="text-sm text-red-600 hover:underline">
                Clear all
              </button>
            </div>
            {favorites.length === 0 ? (
              <p className="text-gray-500 mt-3">No favorites yet — click the heart on a book to add it.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
                {favorites.map((book, i) => (
                  <BookCard key={bookId(book) || i} book={book} isFavorite={true} onToggleFavorite={toggleFavorite} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Book Grid */}
        <div className="mt-6">
          <div className="max-w-6xl mx-auto w-full">
            {/* Heading + count */}
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Required Books</h2>
            </div>

            {/* Grid of book cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {books.map((book, index) => {
                const isFav = favorites.some((f) => bookId(f) === bookId(book));
                return (
                  <BookCard
                    key={bookId(book) || index}
                    book={book}
                    isFavorite={isFav}
                    onToggleFavorite={toggleFavorite}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
