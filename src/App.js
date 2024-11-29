import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import About from "./components/About";
import ContactForm from "./components/ContactForm";
import SearchCars from "./components/SearchCars";
import CarSuggestionForm from "./components/CarSuggestionForm"; // Cập nhật import
import CarDetailPage from "./components/CarDetailPage";
import logo from "./assets/logo.jpg";
import CartPage from "./components/CartPage";



import "./App.css";

export function App() {
  return (
    <Router>
      <div className="App">
        <header style={{ backgroundColor: "silver", padding: "20px", textAlign: "center" }}>
          <img src={logo} alt="Car Showroom" style={{ width: "150px", height: "auto" }} />
          <h1 style={{ color: "white" }}>Car Showroom</h1>
        </header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/book">Car Suggestion</Link> {/* Đổi tên đường dẫn */}
          <Link to="/search">Search Cars</Link>
          <Link to="/cart">Cart</Link>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/search" element={<SearchCars />} />
            <Route path="/car/:carId" element={<CarDetailPage />} />
            <Route path="/book" element={<CarSuggestionForm />} /> {/* Thay thế */}
            <Route path="/cart" element={<CartPage />} />
      
          </Routes>
        </main>

        <footer>
          <p>© 2024 Car Showroom. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
