import React from "react";
import { Link } from "react-router-dom";
import { FaCat } from "react-icons/fa";

function Header() {
  return (
    <header className="bg-gradient-to-r from-orange-200 via-orange-300 to-amber-200 shadow-md p-4 flex justify-between items-center sticky top-0 z-20">

      {/* Logo + Título */}
      <Link
        to="/"
        className="flex items-center gap-3 text-black hover:text-orange-700 transition-colors"
      >
        <FaCat className="text-orange-600 w-7 h-7 animate-pulse" />
        <span className="text-2xl font-bold font-serif drop-shadow-sm">
          Felinicuisina
        </span>
      </Link>

      {/* Navegación */}
      <nav>
        <Link
          to="/explorar"
          className="group flex items-center gap-2 font-semibold text-gray-700 hover:text-orange-500 transition-all px-3 py-2 rounded-md hover:bg-orange-100"
        >
          <FaCat className="text-orange-400 group-hover:animate-bounce" />
          <span>Explorar por Categoría o País</span>
        </Link>
      </nav>
    </header>
  );
}

export default Header;