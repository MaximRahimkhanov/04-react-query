import axios from "axios";
import type { Movie } from "../types/movie";

const VITE_TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN as string;

type ResponseData = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

async function fetchMovies(query: string): Promise<Movie[]> {
  try {
    const response = await axios.get<ResponseData>(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          query,
          include_adult: false,
          language: "en-US",
          page: 1,
        },
        headers: {
          Authorization: `Bearer ${VITE_TMDB_TOKEN}`,
        },
      }
    );

    return response.data.results;
  } catch (error) {
    console.error("fetchMovies error:", error);
    throw new Error("Failed to fetch movies");
  }
}

export default fetchMovies;
