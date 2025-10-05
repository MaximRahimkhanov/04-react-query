
import ReactPaginate from "react-paginate";
import MovieGrid from "../MovieGrid/MovieGrid";
import type { Movie } from "../../types/movie";
import css from "./Pagination.module.css"

interface PaginatedItemsProps {
  items: Movie[];
  itemsPerPage: number;
  onSelect: (movie: Movie) => void;
  pageCount: number;
  onPageChange: (event: { selected: number }) => void;
  currentPage: number;
 }

function PaginatedItems({ items, onSelect, pageCount, onPageChange, currentPage }: PaginatedItemsProps) {
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="→"
         onPageChange={onPageChange}

        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        forcePage={currentPage - 1}
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