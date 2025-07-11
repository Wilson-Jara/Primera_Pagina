import React, { useState, useEffect, useMemo } from "react";
import { getRecipesByFirstLetter } from "../api/mealApi";
import RecipeCard from "../components/RecipeCard";
import ProjectCredits from "../components/ProjectCredits"; // 👈 NUEVO

function Home() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [showCredits, setShowCredits] = useState(false); // 👈 NUEVO

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

  const categories = useMemo(() => {
    const unique = new Set(
      allRecipes.map((r) => r.strCategory).filter(Boolean)
    );
    return Array.from(unique).sort();
  }, [allRecipes]);

  const areas = useMemo(() => {
    const unique = new Set(
      allRecipes.map((r) => r.strArea).filter(Boolean)
    );
    return Array.from(unique).sort();
  }, [allRecipes]);

  const filteredRecipes = useMemo(() => {
    const searchKeywords = searchTerm
      .toLowerCase()
      .split(" ")
      .filter(Boolean);

    let result = allRecipes;

    if (searchKeywords.length) {
      result = result.filter((recipe) => {
        if (!recipe.strMeal) return false;
        const name = recipe.strMeal.toLowerCase();
        return searchKeywords.every((kw) => name.includes(kw));
      });
    }

    if (selectedCategory) {
      result = result.filter(
        (recipe) => recipe.strCategory === selectedCategory
      );
    }

    if (selectedArea) {
      result = result.filter((recipe) => recipe.strArea === selectedArea);
    }

    return result;
  }, [allRecipes, searchTerm, selectedCategory, selectedArea]);

  if (loading) {
    return (
      <p className="text-center text-xl mt-10 text-orange-500">
        🍽️ Cargando recetas mágicas...
      </p>
    );
  }

  const visibleRecipes = filteredRecipes.slice(0, visibleCount);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Todas las Recetas</h1>

      {/* 🎓 Botón para mostrar créditos */}
      <div className="mb-6 text-center">
        <button
          className="px-4 py-2 bg-orange-400 text-white rounded-md shadow hover:bg-orange-500 transition"
          onClick={() => setShowCredits(!showCredits)}
        >
          {showCredits ? "Ocultar Créditos" : "Ver Información del Proyecto"}
        </button>
      </div>

      {/* 👨‍🍳 Créditos del proyecto */}
      {showCredits && <ProjectCredits />}

      {/* 🔍 Buscador */}
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setVisibleCount(12);
          }}
          placeholder="Busca por nombre de receta (ej. chicken soup)..."
          className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* 🧭 Botones por categoría */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-3 py-1 rounded-full text-sm shadow ${
              selectedCategory === category
                ? "bg-orange-500 text-white"
                : "bg-orange-100 text-orange-800"
            }`}
            onClick={() => {
              setSelectedCategory(
                selectedCategory === category ? null : category
              );
              setVisibleCount(12);
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 🌍 Botones por país/área */}
      <div className="flex flex-wrap gap-2 mb-6">
        {areas.map((area) => (
          <button
            key={area}
            className={`px-3 py-1 rounded-full text-sm shadow ${
              selectedArea === area
                ? "bg-green-500 text-white"
                : "bg-green-100 text-green-800"
            }`}
            onClick={() => {
              setSelectedArea(selectedArea === area ? null : area);
              setVisibleCount(12);
            }}
          >
            {area}
          </button>
        ))}
      </div>

      {/* 🧁 Render de recetas */}
      {visibleRecipes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleRecipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>

          {visibleRecipes.length < filteredRecipes.length && (
            <div className="text-center mt-6">
              <button
                className="px-6 py-2 bg-orange-400 hover:bg-orange-500 text-white rounded-md shadow transition"
                onClick={() => setVisibleCount(visibleCount + 12)}
              >
                Ver más recetas
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">
          No se encontraron recetas con esos filtros.
        </p>
      )}
    </div>
  );
}

export default Home;