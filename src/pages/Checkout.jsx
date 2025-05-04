import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51RFJWdBFBStNW91YRlmMUprvorInW1TAO3Ik8hxdbRQUJ6op05LKVP4zRmMRTet2XZrOW6m09fJ6OfKY9fi6HUMI00mGyiO14J');

// Пример данных о товарах (корзина). Нужно передавать реальные данные из твоего состояния.
const cartItems = [
  {
    productId: '123',
    quantity: 1,
    price: 1000, // Пример цены в центах
  },
  // Добавь сюда другие товары из корзины
];

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isProcessing || !stripe || !elements) return;

    setIsProcessing(true);
    setMessage('');

    const cardElement = elements.getElement(CardElement);

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0); // Считаем общую сумму из корзины

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Токен не найден, пользователь не авторизован.');
        setMessage('Ошибка: пользователь не авторизован.');
        setIsProcessing(false);
        return;
      }

      // Отправляем запрос на сервер с данными корзины и токеном
      const res = await axios.post('http://localhost:5000/create-payment-intent', {
        amount: totalAmount, // Общая сумма в центах
        items: cartItems,    // Корзина с товарами
        token: token,        // Токен авторизации
      });

      const data = res.data;

      if (!data.clientSecret) {
        throw new Error('Не удалось получить clientSecret');
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        console.log('[Ошибка]', error);
        setMessage('Ошибка при оплате: ' + error.message);
      } else if (paymentIntent.status === 'succeeded') {
        console.log('[Успешный платеж]', paymentIntent);
        setMessage('✅ Платёж прошёл успешно!');
        // Тут можно очистить корзину или перенаправить пользователя
      } else {
        setMessage(`Статус платежа: ${paymentIntent.status}`);
      }
    } catch (err) {
      console.error('Ошибка запроса:', err);
      setMessage('Произошла ошибка при оплате.');
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-md">
      <CardElement
        options={{
          hidePostalCode: true,
          style: {
            base: {
              fontSize: '16px',
              color: '#32325d',
              '::placeholder': {
                color: '#a0aec0',
              },
            },
            invalid: {
              color: '#e53e3e',
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
      >
        {isProcessing ? 'Обработка...' : 'Оплатить'}
      </button>
      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
    </form>
  );
};

const Checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;
 