import ReactPaginate from "react-paginate";
import MovieGrid from "../MovieGrid/MovieGrid";
import type { Movie } from "../../types/movie";
import css from "./Pagination.module.css";

interface PaginatedItemsProps {
  items: Movie[];
  itemsPerPage: number;
  onSelect: (movie: Movie) => void;
  pageCount: number;
  onPageChange: (event: { selected: number }) => void;
  forcePage: number;
 }

function PaginatedItems({ items, onSelect, pageCount, onPageChange, forcePage }: PaginatedItemsProps) {
  return (
    <>
      
      <ReactPaginate
        breakLabel="..."
        nextLabel="→"
        onPageChange={({ selected }) => onPageChange({ selected })}

        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        forcePage={forcePage}

        previousLabel="←"
        renderOnZeroPageCount={null}
        containerClassName={css.pagination}
        activeClassName={css.active}
        
      />
      <MovieGrid movies={items} onSelect={onSelect} />
    </>
  );
}

export default PaginatedItems;
