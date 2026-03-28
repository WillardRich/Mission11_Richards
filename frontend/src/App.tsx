import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import ProjectsPage from "./pages/HomePage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProjectsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;