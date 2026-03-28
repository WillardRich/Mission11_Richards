import { useEffect, useState } from "react";

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/books/category")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (value: string) => {
    const updated = selectedCategories.includes(value)
      ? selectedCategories.filter((c) => c !== value)
      : [...selectedCategories, value];

    console.log("Selected:", updated); // 🔥 DEBUG

    setSelectedCategories(updated);
  };

  return (
    <div>
      <h5>Categories</h5>

      {categories.map((c) => (
        <div key={c}>
          <input
            type="checkbox"
            value={c}
            checked={selectedCategories.includes(c)}
            onChange={() => handleChange(c)}
          />
          <label className="ms-2">{c}</label>
        </div>
      ))}
    </div>
  );
}

export default CategoryFilter;