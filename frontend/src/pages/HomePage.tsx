import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import ProjectList from '../components/BookList';
import WelcomeBand from '../components/WelcomeBand';
import CartSummary from '../components/CartSummary';

function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  return (
    <div className="container mt-4">
      {/* Cart summary (fixed UI) */}
      <CartSummary />

      {/* Optional header/banner */}
      <WelcomeBand />

      <div className="row mt-3">
        {/* Sidebar filter */}
        <div className="col-md-3">
          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        {/* Main book list */}
        <div className="col-md-9">
          <ProjectList selectedCategory={selectedCategory} />
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;