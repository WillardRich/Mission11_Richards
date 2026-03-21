import { useEffect, useState } from "react";
import type { Book } from "./types/Book";

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState(5);
  const [pageNum, setPageNum] = useState(1);
  const [sortBy, setSortBy] = useState("title");

  useEffect(() => {
    fetchBooks();
  }, [pageSize, pageNum, sortBy]);

  const fetchBooks = async () => {
    const res = await fetch(
      `http://localhost:5000/api/books?pageSize=${pageSize}&pageNum=${pageNum}&sortBy=${sortBy}`
    );
    const data = await res.json();
    setBooks(data);
  };

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">📚 Bookstore</h1>

      {/* Controls */}
      <div className="d-flex align-items-center mb-3">
        <div>
          <label>Results per page:</label>
          <select
            className="form-select ms-2"
            style={{ width: "100px", display: "inline-block" }}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageNum(1); // reset page
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className="ms-4">
          <label>Sort by:</label>
          <select
            className="form-select ms-2"
            style={{ width: "120px", display: "inline-block" }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="title">Title</option>
          </select>
        </div>
      </div>

      {/* Book Cards */}
      {books.map((b) => (
        <div className="card mb-3 shadow-sm" key={b.bookID}>
          <div className="card-body">
            <h4 className="card-title">{b.title}</h4>
            <p className="card-text">
              <strong>Author:</strong> {b.author}
            </p>
            <p><strong>Publisher:</strong> {b.publisher}</p>
            <p><strong>ISBN:</strong> {b.isbn}</p>
            <p><strong>Category:</strong> {b.category}</p>
            <p><strong>Pages:</strong> {b.pageCount}</p>
            <p><strong>Price:</strong> ${b.price}</p>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-secondary"
          onClick={() => setPageNum((prev) => Math.max(prev - 1, 1))}
          disabled={pageNum === 1}
        >
          ⬅ Previous
        </button>

        <span>Page {pageNum}</span>

        <button
          className="btn btn-secondary"
          onClick={() => setPageNum((prev) => prev + 1)}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}

export default App;