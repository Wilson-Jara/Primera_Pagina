// src/pages/Home.jsx
import React, { useState, useEffect, useMemo } from "react";
import { getRecipesByFirstLetter } from "../api/mealApi";
import RecipeCard from "../components/RecipeCard";

function Home() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAllRecipes = async () => {
      setLoading(true);
      try {
        const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
        const promises = alphabet.map((letter) =>
          getRecipesByFirstLetter(letter)
        );
        const results = await Promise.all(promises);
        const flattenedRecipes = results
          .flat()
          .filter(Boolean)
          .sort((a, b) => a.strMeal.localeCompare(b.strMeal));
        setAllRecipes(flattenedRecipes);
      } catch (error) {
        console.error("Failed to fetch all recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllRecipes();
  }, []);

  // --- LA LÓGICA DEL FILTRO HA CAMBIADO AQUÍ ---
  const filteredRecipes = useMemo(() => {
    // 1. Preparamos el término de búsqueda: lo pasamos a minúsculas,
    //    lo dividimos en palabras y eliminamos posibles espacios vacíos.
    const searchKeywords = searchTerm.toLowerCase().split(" ").filter(Boolean);

    // 2. Si no hay nada en el buscador, mostramos todas las recetas.
    if (!searchKeywords.length) {
      return allRecipes;
    }

    // 3. Filtramos la lista de recetas.
    return allRecipes.filter((recipe) => {
      // Nos aseguramos de que la receta tenga un nombre antes de buscar.
      if (!recipe.strMeal) {
        return false;
      }
      const recipeName = recipe.strMeal.toLowerCase();

      // Usamos .every(), que comprueba si la receta cumple con TODAS las palabras clave.
      // Para que una receta se muestre, CADA palabra clave debe estar incluida en su nombre.
      return searchKeywords.every((keyword) => recipeName.includes(keyword));
    });
  }, [allRecipes, searchTerm]); // Esta función se vuelve a ejecutar cuando cambian las recetas o el término de búsqueda.

  if (loading) {
    return <p className="text-center text-xl mt-10">Cargando recetas...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Todas las Recetas</h1>
      <div className="mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Busca por nombre de receta (ej. chicken soup)..."
          className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No se encontraron recetas con esos términos de búsqueda.
        </p>
      )}
    </div>
  );
}

export default Home;