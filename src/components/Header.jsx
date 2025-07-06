// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-20">
      {/* Botón de Home */}
      <Link to="/" className="text-2xl font-bold text-orange-500">
        RecetasDelMundo
      </Link>

      <nav>
        {/* Enlace a la nueva página Explorar */}
        <Link
          to="/explorar"
          className="font-semibold text-gray-700 hover:text-orange-500 transition-colors"
        >
          Explorar por Categoría o País
        </Link>
      </nav>
    </header>
  );
}

export default Header;