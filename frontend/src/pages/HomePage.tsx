import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import BookList from '../components/BookList';
import WelcomeBand from '../components/WelcomeBand';
import CartSummary from '../components/CartSummary';

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div
      style={{
        backgroundColor: '#f5f7fa',
        minHeight: '100vh',
        padding: '40px 0',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: '1100px' }}>

        {/* Top bar */}
        <div className="d-flex justify-content-end mb-3">
          <CartSummary />
        </div>

        {/* Header */}
        <div className="mb-4">
          <WelcomeBand />
        </div>

        {/* Main content card */}
        <div className="bg-white shadow rounded p-4">
          <div className="row g-4">

            {/* Sidebar */}
            <div className="col-md-3">
              <div className="p-3 border rounded bg-light h-100">
                <CategoryFilter
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                />
              </div>
            </div>

            {/* Book list */}
            <div className="col-md-9">
              <BookList selectedCategories={selectedCategories} />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default BooksPage;