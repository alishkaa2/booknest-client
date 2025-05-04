import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState(''); // новое поле
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }), // добавили name
      });

      const data = await response.json();
      console.log('Ответ от сервера:', data);

      if (response.ok) {
        setSuccess(true);
        setError('');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(data.error || 'Что-то пошло не так');
        setSuccess(false);
      }
    } catch (err) {
      setError('Ошибка сети. Попробуйте снова.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-center">Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label htmlFor="name" className="block">Имя</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="email" className="block">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="block">Пароль</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Зарегистрироваться
        </button>
      </form>

      {success && <p className="mt-4 text-green-500 text-center">Регистрация прошла успешно! Перенаправление...</p>}
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

      <div className="mt-4 text-center">
        <Link to="/login">
          <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
            Войти
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
