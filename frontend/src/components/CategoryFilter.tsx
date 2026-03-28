import { useEffect, useState } from 'react';

function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://localhost:5001/api/books/categories'
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

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedCategory(e.target.value);
  }

  return (
    <div className="category-filter">
      <h5>Filter by Category</h5>

      <select
        className="form-select"
        value={selectedCategory}
        onChange={handleChange}
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;