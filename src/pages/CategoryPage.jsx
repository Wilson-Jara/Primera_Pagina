// src/pages/CategoryPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMealsByCategory } from "../api/mealApi";
import RecipeCard from "../components/RecipeCard";

function CategoryPage() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryName } = useParams(); // Obtiene el nombre de la categoría de la URL

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      const data = await getMealsByCategory(categoryName);
      setMeals(data);
      setLoading(false);
    };

    fetchMeals();
  }, [categoryName]); // Se ejecuta cada vez que categoryName cambia

  if (loading) {
    return <p className="text-center text-xl mt-10">Cargando...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Recetas en la categoría: {categoryName}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {meals.map((meal) => (
          <RecipeCard key={meal.idMeal} recipe={meal} />
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;