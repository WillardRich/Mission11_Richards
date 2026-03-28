import { useEffect, useState } from 'react';
import type { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProjectList({
  selectedCategory,
}: {
  selectedCategory: string;
}) {
  const [projects, setProjects] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        `http://localhost:5000/api/books?pageSize=${pageSize}&pageNum=${pageNum}${
          selectedCategory ? `&category=${encodeURIComponent(selectedCategory)}` : ''
        }`
    
      );

      const data = await response.json();
      console.log("API DATA:", data);

      setProjects(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    };

    fetchProjects();
  }, [pageSize, pageNum, selectedCategory]);

  // Reset page when category changes
  useEffect(() => {
    setPageNum(1);
  }, [selectedCategory]);

  return (
    <>
      <div className="row">
        {projects.map((p) => (
          <div className="col-md-4 mb-3" key={p.bookID}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{p.title}</h5>

                <p><strong>Author:</strong> {p.author}</p>
                <p><strong>Category:</strong> {p.category}</p>
                <p><strong>Price:</strong> ${p.price.toFixed(2)}</p>

                <button
                  className="btn btn-primary me-2"
                  onClick={() => addToCart(p)}
                >
                  Add to Cart
                </button>

                <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/cart')}
                >
                  View Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-3">
        <button
          className="btn btn-secondary me-2"
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            className={`btn me-1 ${
              pageNum === i + 1 ? 'btn-primary' : 'btn-outline-primary'
            }`}
            onClick={() => setPageNum(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="btn btn-secondary ms-2"
          disabled={pageNum === totalPages}
          onClick={() => setPageNum(pageNum + 1)}
        >
          Next
        </button>
      </div>

      {/* Page Size */}
      <div className="mt-3">
        <label className="form-label me-2">Results per page:</label>
        <select
          className="form-select w-auto d-inline-block"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
    </>
  );
}

export default ProjectList;