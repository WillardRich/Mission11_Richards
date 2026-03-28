import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import type { Book } from "./types/Book";
import { CartProvider } from "./context/CartContext";

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState(5);
  const [pageNum, setPageNum] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const fetchBooks = async () => {
    let url = `http://localhost:5000/api/books?pageSize=${pageSize}&pageNum=${pageNum}`;

    if (selectedCategories.length > 0) {
      url += `&categories=${selectedCategories.join(",")}`;
    }

    console.log("FETCHING:", url); // 🔥 debug

    try {
      const res = await fetch(url);
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [pageSize, pageNum, selectedCategories]);

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                books={books}
                pageSize={pageSize}
                setPageSize={setPageSize}
                pageNum={pageNum}
                setPageNum={setPageNum}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
              />
            }
          />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;