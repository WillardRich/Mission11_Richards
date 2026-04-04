import { useState, useEffect } from "react";
import type { Book } from "../types/Book";
import { deleteBook, fetchBooks } from "../api/bookAPI";
import Pagination from "../components/Pagination";
import NewBookForm from "../components/NewBookForm";
import EditBookForm from "../components/EditProjectForm";

const AdminBooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks(pageSize, pageNum, []);
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [pageSize, pageNum]);

  const handleDelete = async (bookID: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmDelete) return;
    try {
      await deleteBook(bookID);
      setBooks(books.filter((b) => b.bookID !== bookID));
    } catch (err) {
      alert("Failed to delete book: " + (err as Error).message);
    }
  };

  if (loading) return <p className="text-center mt-5">Loading books...</p>;
  if (error) return <p className="text-danger text-center">Error: {error}</p>;

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold mb-0">Admin Books</h1>

        {!showForm && (
          <button
            className="btn btn-success"
            onClick={() => setShowForm(true)}
          >
            + Add New Book
          </button>
        )}
      </div>

      {/* New Book Form */}
      {showForm && (
        <div className="card shadow-sm p-3 mb-4">
          <NewBookForm
            onSuccess={() => {
              setShowForm(false);
              fetchBooks(pageSize, pageNum, []).then((data) =>
                setBooks(data.books)
              );
            }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {/* Edit Book Form */}
      {editingBook && (
        <div className="card shadow-sm p-3 mb-4">
          <EditBookForm
            book={editingBook}
            onSuccess={() => {
              setEditingBook(null);
              fetchBooks(pageSize, pageNum, []).then((data) =>
                setBooks(data.books)
              );
            }}
            onCancel={() => setEditingBook(null)}
          />
        </div>
      )}

      {/* Table */}
      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>ISBN</th>
                <th>Classification</th>
                <th>Category</th>
                <th>Page Count</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.bookID}>
                  <td>{book.bookID}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publisher}</td>
                  <td>{book.isbn}</td>
                  <td>{book.classification}</td>
                  <td>{book.category}</td>
                  <td>{book.pageCount}</td>
                  <td>${book.price.toFixed(2)}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        onClick={() => setEditingBook(book)}
                        className="btn btn-sm btn-primary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(book.bookID)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-4">
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
      </div>
    </div>
  );
};

export default AdminBooksPage;