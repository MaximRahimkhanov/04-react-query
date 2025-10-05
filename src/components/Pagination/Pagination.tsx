
import ReactPaginate from "react-paginate";
import MovieGrid from "../MovieGrid/MovieGrid";
import type { Movie } from "../../types/movie";
import css from "./Pagination.module.css"

interface Props {
  items: Movie[];
  itemsPerPage: number;
  onSelect: (movie: Movie) => void;
  pageCount: number;
  onPageChange: (page: number) => void;
  currentPage: number;
 


}

function PaginatedItems({ items, onSelect, pageCount, onPageChange, currentPage }: Props) {
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="→"
        onPageChange={({ selected }) => onPageChange(selected + 1)}
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