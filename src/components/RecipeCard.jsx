import React from "react";
import { Link } from "react-router-dom";
import { FaCat, FaPaw } from "react-icons/fa";

function RecipeCard({ recipe }) {
  return (
    <Link
      to={`/recipe/${recipe.idMeal}`}
      className="relative bg-orange-200 rounded-xl shadow-lg overflow-hidden border-2 border-orange-300 transform hover:scale-105 transition-transform duration-300 hover:shadow-xl group"
    >
      {/* 🐾 Huellitas decorativas (fondo superior) */}
      <FaPaw className="absolute top-3 left-3 text-orange-400 opacity-20 text-2xl rotate-12 pointer-events-none" />
      <FaPaw className="absolute top-6 right-6 text-orange-300 opacity-20 text-xl -rotate-12 pointer-events-none" />

      {/* Imagen de receta */}
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover"
      />

      {/* 🐱 Detalles */}
      <div className="p-4 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <FaCat className="text-orange-600 group-hover:animate-bounce" />
          <h3 className="font-bold text-lg text-gray-800 truncate">
            {recipe.strMeal}
          </h3>
        </div>
        {recipe.strArea && (
          <p className="text-sm text-gray-700 font-medium italic">
            🐾 Región: {recipe.strArea}
          </p>
        )}
      </div>
    </Link>
  );
}

export default RecipeCard;