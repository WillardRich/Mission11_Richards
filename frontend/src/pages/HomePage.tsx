import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import BookList from '../components/BookList';
import WelcomeBand from '../components/WelcomeBand';
import CartSummary from '../components/CartSummary';

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container py-4">
      {/* Top bar */}
      <div className="d-flex justify-content-end mb-3">
        <CartSummary />
      </div>

      {/* Header */}
      <div className="mb-4">
        <WelcomeBand />
      </div>

      <div className="row g-4">
        {/* Sidebar filter */}
        <div className="col-md-3">
          <div className="p-3 bg-white border rounded shadow-sm">
            <CategoryFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
        </div>

        {/* Main book list */}
        <div className="col-md-9">
          <div className="bg-white p-3 rounded shadow-sm">
            <BookList selectedCategories={selectedCategories} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BooksPage;