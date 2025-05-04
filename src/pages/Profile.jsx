import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const user = {
    name: "Admin",
    email: "admin@example.com"
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Профиль пользователя</h1>
      <div className="bg-white rounded-2xl shadow p-6 max-w-md">
        <div className="mb-4">
          <span className="text-gray-500">Имя:</span>
          <div className="text-lg font-semibold">{user.name}</div>
        </div>
        <div className="mb-4">
          <span className="text-gray-500">Email:</span>
          <div className="text-lg font-semibold">{user.email}</div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-3 mt-4 rounded-xl hover:bg-red-700 transition"
        >
          Выйти
        </button>
      </div>
    </div>
  );
};

export default Profile;
