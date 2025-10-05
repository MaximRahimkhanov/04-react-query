import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import { useQuery , keepPreviousData} from "@tanstack/react-query";
import type { ResponseData } from "../../services/movieService";
import PaginatedItems from "../Pagination/Pagination";
import Loader from "../Loader/Loader";

function App() {
  const [query, setQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data, isLoading, isError, isSuccess, isFetching } = useQuery<ResponseData, Error>({
  queryKey: ['movie', query, currentPage],
  queryFn: () => fetchMovies(query, currentPage),
  retry: false,
  enabled: !!query.trim(),
  placeholderData: keepPreviousData,
});


   useEffect(() => {
    if (isSuccess && data?.results?.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [isSuccess, data]);


  const handleSubmit = (value: string) => {
    setQuery(value);
    setCurrentPage(1);
  };

  const handleImageClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

const handlePageChange = (event: { selected: number }) => {
  setCurrentPage(event.selected + 1);
};


  const totalPages = data?.total_pages ?? 0;

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      <Toaster />
{isFetching && !isLoading && <Loader />}

      {!isLoading && !isError && data?.results?.length === 0 && (
  <ErrorMessage message="No movies found for your request." />
)}



      {data?.results && data.results.length > 0 && (
        <PaginatedItems
          items={data.results}
          itemsPerPage={6}
          onSelect={handleImageClick}
          pageCount={totalPages}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
