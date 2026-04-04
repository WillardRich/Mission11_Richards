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
  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  return (
    <div>
      <h1>Admin Books</h1>
      {!showForm && (
        <button className = "btn btn-success mb-3" 
        onClick={() => setShowForm(true)}>
          Add New Book
        </button>
      )} 
      {showForm && (
        <NewBookForm
          onSuccess={() => {
            setShowForm(false);
            fetchBooks(pageSize, pageNum, []).then((data) =>
              setBooks(data.books),
            );
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
      {editingBook && (
        <EditBookForm
          book={editingBook}
          onSuccess={() => {
            setEditingBook(null);
            fetchBooks(pageSize, pageNum, []).then((data) =>
              setBooks(data.books),
            );
          }}
          onCancel={() => setEditingBook(null)}
        />
        )};
      <table className="table">
        <thead>
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
                <button
                  onClick={() => setEditingBook(book)}
                  className="btn btn-primary"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book.bookID)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
  );
};

export default AdminBooksPage;
