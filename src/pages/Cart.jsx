import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return <div className="p-4 text-xl">Корзина пуста</div>;
  }

  return (
    <div className="p-4 space-y-4">
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between bg-white p-4 rounded-xl shadow"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-28 object-cover rounded"
            />
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.author}</p>
              <p className="font-bold">{item.price} ₸</p>
              <div className="flex items-center mt-2 gap-2">
                <button
                  onClick={() => decreaseQuantity(item)}
                  className="px-2 bg-gray-200 rounded"
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item)}
                  className="px-2 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={() => removeFromCart(item)}
            className="text-red-500 hover:text-red-700"
          >
            Удалить
          </button>
        </div>
      ))}

      <div className="text-right text-xl font-bold">
        Общая сумма: {total} ₸
      </div>

      <div className="flex justify-between">
        <button
          onClick={clearCart}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-xl"
        >
          Очистить корзину
        </button>
        <Link
          to="/checkout"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          Перейти к оплате
        </Link>
      </div>
    </div>
  );
};

export default Cart;
