import BookList from "../components/BookList";
import CategoryFilter from "../components/CategoryFilter";
import CartSummary from "../components/CartSummary";
import type { Book } from "../types/Book";

function HomePage({
  books,
  pageSize,
  setPageSize,
  pageNum,
  setPageNum,
  selectedCategories,
  setSelectedCategories,
}: {
  books: Book[];
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  pageNum: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <div className="container">
      <h1 className="mt-4 mb-4">📚 Bookstore</h1>

      <div className="row">
        {/* LEFT: FILTER */}
        <div className="col-3">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>

        {/* CENTER: BOOKS */}
        <div className="col-6">
          {/* Controls */}
          <div className="mb-3">
            <label>Results per page:</label>
            <select
              className="form-select"
              style={{ width: "100px" }}
              value={pageSize}
              onChange={(e) => {
                console.log("Page size changed");
                setPageSize(Number(e.target.value));
                setPageNum(1); // reset page
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <BookList books={books} />

          {/* Pagination */}
          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn btn-secondary"
              onClick={() => {
                console.log("Previous clicked");
                setPageNum((prev) => Math.max(prev - 1, 1));
              }}
            >
              ⬅ Previous
            </button>

            <span>Page {pageNum}</span>

            <button
              className="btn btn-secondary"
              onClick={() => {
                console.log("Next clicked");
                setPageNum((prev) => prev + 1);
              }}
            >
              Next ➡
            </button>
          </div>
        </div>

        {/* RIGHT: CART */}
        <div className="col-3">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}

export default HomePage;