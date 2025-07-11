// src/pages/RecipeDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMealById } from "../api/mealApi";
// --- ¡ACTUALIZAMOS LOS IMPORTS! ---
import {
  convertInstructionsToSI,
  convertIngredientMeasure,
} from "../utils/converters";

function RecipeDetail() {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const { recipeId } = useParams();

  useEffect(() => {
    const fetchMealDetail = async () => {
      setLoading(true);
      const data = await getMealById(recipeId);
      setMeal(data);
      setLoading(false);
    };
    fetchMealDetail();
  }, [recipeId]);

  if (loading) {
    return <p className="text-center text-xl mt-10">Cargando detalles...</p>;
  }

  if (!meal) {
    return <p className="text-center text-xl mt-10">Receta no encontrada.</p>;
  }

  // --- LÓGICA DE INGREDIENTES CORREGIDA ---
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredientName = meal[`strIngredient${i}`];
    const originalMeasure = meal[`strMeasure${i}`];

    if (ingredientName && originalMeasure) {
      // --- CAMBIO APLICADO: Se quitó el segundo argumento 'ingredientName' ---
      const convertedMeasure = convertIngredientMeasure(originalMeasure);

      ingredients.push({
        name: ingredientName,
        measure: convertedMeasure,
        original: originalMeasure, // Guardamos el original por si acaso
      });
    } else {
      break;
    }
  }

  const convertedInstructions = convertInstructionsToSI(meal.strInstructions);

  return (
    <div className="max-w-4xl mx-auto bg-orange-300 p-6 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-4">{meal.strMeal}</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full rounded-lg"
          />
          <p className="text-gray-600 mt-2">
            <strong>Categoría:</strong> {meal.strCategory} |{" "}
            <strong>Origen:</strong> {meal.strArea}
          </p>
        </div>
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-3">Ingredientes</h2>
          <ul className="list-disc list-inside space-y-1">
            {ingredients.map((ing, index) => (
              <li key={index}>
                {ing.name} - <strong>{ing.measure}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-3">Instrucciones</h2>
        {convertedInstructions.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-4 text-justify">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

export default RecipeDetail;