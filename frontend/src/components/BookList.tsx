import { useEffect, useState } from "react";
import type { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./BookList.css";
import { fetchBooks } from "../api/bookAPI";
import Pagination from "./Pagination";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories);

        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, selectedCategories]);

  useEffect(() => {
    setPageNum(1);
  }, [selectedCategories]);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  // Reset page when category changes

  return (
    <>
      <div className="row">
        {books.map((p) => (
          <div className="col-md-4 mb-3" key={p.bookID}>
            <div className="card h-100 card-hover border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{p.title}</h5>

                <p>
                  <strong>Author:</strong> {p.author}
                </p>
                <p>
                  <strong>Category:</strong> {p.category}
                </p>
                <p>
                  <strong>Price:</strong> ${p.price.toFixed(2)}
                </p>

                <button
                  className="btn btn-primary me-2"
                  onClick={() => addToCart(p)}
                >
                  Add to Cart
                </button>

                <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigate("/cart")}
                >
                  View Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
      
    </>
  );
}

export default BookList;
