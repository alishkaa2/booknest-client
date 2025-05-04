import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import BookDetails from "./pages/BookDetails";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register"; // 👈 добавить
import Checkout from "./pages/Checkout"; // 👈 добавить

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> {/* 👈 добавить */}
            <Route path="/checkout" element={<Checkout />} /> {/* 👈 добавить */}
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
