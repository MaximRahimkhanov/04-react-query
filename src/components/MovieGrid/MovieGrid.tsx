import type { Movie } from "../../types/movie";
import styles from "./MovieGrid.module.css";


type Props = {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
};

export default function MovieGrid({ movies, onSelect }: Props) {
  return (
    <ul className={styles.grid}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <div className={styles.card}>
            <img
              className={styles.image}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              loading="lazy"
              onClick={() => onSelect(movie)}
            />
            <h2 className={styles.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}

