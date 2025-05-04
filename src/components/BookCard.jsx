import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext"; // 👈 заменили redux
import { motion } from "framer-motion";

const BookCard = ({ book }) => {
  const { addToCart } = useCart(); // 👈 получили из контекста

  const handleAddToCart = () => {
    addToCart(book);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl shadow-md p-4 flex flex-col"
    >
      <Link to={`/book/${book.id}`} className="flex-1 flex flex-col">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-60 object-cover rounded-xl mb-4"
        />
        <h3 className="text-xl font-semibold mb-1">{book.title}</h3>
        <p className="text-gray-500 mb-2">{book.author}</p>
        <p className="text-lg font-bold">{book.price} ₸</p>
      </Link>
      <button
        onClick={handleAddToCart}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition"
      >
        В корзину
      </button>
    </motion.div>
  );
};

export default BookCard;
