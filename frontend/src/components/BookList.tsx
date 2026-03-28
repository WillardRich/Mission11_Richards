import type { Book } from "../types/Book";
import { useCart } from "../context/CartContext";

function BookList({ books }: { books: Book[] }) {
  const { addToCart } = useCart();

  return (
    <>
      {books.map((b) => (
        <div className="card mb-3 shadow-sm" key={b.bookID}>
          <div className="card-body">
            <h4>{b.title}</h4>
            <p><strong>Author:</strong> {b.author}</p>
            <p><strong>Category:</strong> {b.category}</p>
            <p><strong>Price:</strong> ${b.price}</p>
            <button
  className="btn btn-primary"
  onClick={() =>
    addToCart({
      id: b.bookID,
      title: b.title,
      price: b.price,
    })
  }
>
  Add to Cart
</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default BookList;