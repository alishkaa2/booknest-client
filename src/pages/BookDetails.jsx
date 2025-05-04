import { useParams } from "react-router-dom";
import books from "../data/books.json";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const BookDetails = () => {
  const { id } = useParams();
  const book = books.find((b) => b.id === parseInt(id));
  const dispatch = useDispatch();

  if (!book) {
    return <div className="p-4 text-center text-red-600">Книга не найдена</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col md:flex-row gap-6">
      <img
        src={book.image}
        alt={book.title}
        className="w-full md:w-1/3 h-auto rounded shadow-md object-cover"
      />
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-2">{book.title}</h2>
        <p className="text-gray-600 mb-1">Автор: {book.author}</p>
        <p className="text-lg font-semibold text-green-600 mb-4">
          {book.price} ₸
        </p>
        <p className="text-gray-700 mb-6">{book.description}</p>
        <button
          onClick={() => dispatch(addToCart(book))}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
        >
          Добавить в корзину
        </button>
      </div>
    </div>
  );
};

export default BookDetails;
