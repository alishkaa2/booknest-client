import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-700 tracking-wide">
          BookNest
        </Link>
        <nav className="flex gap-6 items-center text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600 transition-colors">Главная</Link>
          <Link to="/cart" className="hover:text-blue-600 transition-colors">Корзина</Link>
          
          <Link to="/profile" className="text-gray-700 hover:text-blue-600 font-medium">Профиль</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
