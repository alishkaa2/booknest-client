import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      if (res.data.message === 'Вход успешен!' && res.data.token) {
        localStorage.setItem('token', res.data.token); // ✅ сохраняем токен
        alert('Вход выполнен успешно!');
        console.log('Redirecting...');
        navigate('/');
      } else {
        alert('Ошибка входа: ' + (res.data.error || 'неизвестная ошибка'));
      }
    } catch (err) {
      console.error('Ошибка при входе:', err);
      alert('Произошла ошибка при входе. Проверьте данные.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-center">Вход</h2>
      <form onSubmit={handleSubmit}>
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
          Войти
        </button>
      </form>

      <div className="mt-4 text-center">
        <p>Нет аккаунта? <Link to="/register" className="text-blue-500">Зарегистрируйтесь</Link></p>
      </div>

      <div className="mt-4 text-center">
        <Link to="/register">
          <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
            Зарегистрироваться
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
