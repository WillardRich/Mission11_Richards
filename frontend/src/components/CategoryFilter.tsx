import { useEffect, useState } from 'react';

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          '"https://richardsbookstore-backend-dmhhe0hsdeg2eyf9.francecentral-01.azurewebsites.net/api/books/categories'
        );
        const data = await response.json();
        console.log('Fetched categories:', data);
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  function handleToggle(category: string) {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((c) => c !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  }

  return (
    <div className="category-filter">
      <h5>Filter by Category</h5>

      {/* Clear Filters Button */}
      <button
        className="btn btn-sm btn-outline-secondary mb-2"
        onClick={() => setSelectedCategories([])}
      >
        Clear Filters
      </button>

      {/* Checkbox List */}
      {categories.map((c) => (
        <div key={c} className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id={c}
            checked={selectedCategories.includes(c)}
            onChange={() => handleToggle(c)}
          />
          <label className="form-check-label" htmlFor={c}>
            {c}
          </label>
        </div>
      ))}
    </div>
  );
}

export default CategoryFilter;