import React from "react";
import { useCart } from "../contexts/CartContext"; // Импортируем useCart

const AddToCartButton = ({ book }) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: book, // Добавляем книгу в корзину
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-300"
    >
      В корзину
    </button>
  );
};

export default AddToCartButton;
