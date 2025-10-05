import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieModal from "../MovieModal/MovieModal";
import fetchMovies from "../../services/movieService";
import type { Movie } from "../../types/movie";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const getQuery = async (query: string) => {
    setIsLoading(true);
    setError(false);
    setMovies([]);

    try {
      const data = await fetchMovies(query);

      if (data.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }

      setMovies(data);
    } catch {
      toast.error("Server error. Please try again.");
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <SearchBar onSubmit={getQuery} />
      <Toaster />

      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage />
      ) : (
        movies.length > 0 && (
          <MovieGrid movies={movies} onSelect={handleImageClick} />
        )
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
