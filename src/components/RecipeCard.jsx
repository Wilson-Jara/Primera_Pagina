// src/components/RecipeCard.jsx
import React from "react";
import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  return (
    <Link
      to={`/recipe/${recipe.idMeal}`}
      className="bg-white rounded-lg shadow-md overflow-hidden
                 transform hover:scale-105 transition-transform duration-300"
    >
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg truncate">{recipe.strMeal}</h3>
        {recipe.strArea && (
          <p className="text-sm text-gray-500">{recipe.strArea}</p>
        )}
      </div>
    </Link>
  );
}

export default RecipeCard;