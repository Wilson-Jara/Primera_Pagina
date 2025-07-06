// src/pages/AreaPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMealsByArea } from "../api/mealApi";
import RecipeCard from "../components/RecipeCard";

function AreaPage() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { areaName } = useParams(); // Obtiene el nombre del país de la URL

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      const data = await getMealsByArea(areaName);
      setMeals(data);
      setLoading(false);
    };

    fetchMeals();
  }, [areaName]); // Se ejecuta cada vez que areaName cambia

  if (loading) {
    return <p className="text-center text-xl mt-10">Cargando...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Recetas de: {areaName}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {meals.map((meal) => (
          // La API de filtro por área no devuelve el ID, así que usamos el de categoría
          // y le pasamos el objeto meal completo que sí tiene idMeal
          <RecipeCard key={meal.idMeal} recipe={meal} />
        ))}
      </div>
    </div>
  );
}

export default AreaPage;