import axios from "axios";
import type { Movie } from "../types/movie";

export type ResponseData = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

const VITE_TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN as string;

export async function fetchMovies(query: string, page: number): Promise<ResponseData> {
  const response = await axios.get<ResponseData>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
        include_adult: false,
        language: "en-US",
        page,
      },
      headers: {
        Authorization: `Bearer ${VITE_TMDB_TOKEN}`,
      },
    }
  );

  return response.data;
}
