import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-center text-gray-500 py-6 mt-10 text-sm">
      © {new Date().getFullYear()} BookNest — Все права защищены
    </footer>
  );
};

export default Footer;
