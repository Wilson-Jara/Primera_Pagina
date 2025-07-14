import React, { useState, useEffect, useMemo } from "react";
import { getRecipesByFirstLetter } from "../api/mealApi";
import RecipeCard from "../components/RecipeCard";
import ProjectCredits from "../components/ProjectCredits";
import { FaCat } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function Home() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [showCredits, setShowCredits] = useState(false);
  const navigate = useNavigate();

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
        // 🐾 Delay de 1 segundo antes de terminar la carga
        setTimeout(() => {
          setLoading(false);
        }, 1000);
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

    let result = [...allRecipes];

    const noFiltersApplied =
      searchKeywords.length === 0 &&
      !selectedCategory &&
      !selectedArea;

    if (noFiltersApplied) {
      // Mezcla aleatoria con Fisher-Yates
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }
    } else {
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
        result = result.filter(
          (recipe) => recipe.strArea === selectedArea
        );
      }
    }

    return result;
  }, [allRecipes, searchTerm, selectedCategory, selectedArea]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[var(--card-bg)]">
        <img
          src="/gatos/gatito_caminando.png"
          alt="Gatito caminando"
          className="w-56 h-56 mb-6 gatito-moviendo bg-transparent opacity-80"
        />
        <p className="text-2xl md:text-3xl font-bold text-[var(--text-color)] animate-pulse text-center">
          🍽️ Cargando recetas mágicas...
        </p>
      </div>
    );
  }


  const visibleRecipes = filteredRecipes.slice(0, visibleCount);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Todas las Recetas</h1>
      <div className="mb-6 text-center">
        <button
          className="px-4 py-2 bg-orange-400 text-white rounded-md shadow hover:bg-orange-500 transition"
          onClick={() => navigate("/creditos")}
        >
          Ver Créditos del Proyecto
        </button>
      </div>

      {showCredits && <ProjectCredits />}

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

      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-3 py-1 rounded-full text-sm shadow ${selectedCategory === category
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

      <div className="flex flex-wrap gap-2 mb-6">
        {areas.map((area) => (
          <button
            key={area}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm shadow ${selectedArea === area
              ? "bg-green-500 text-white"
              : "bg-green-100 text-green-800"
              }`}
            onClick={() => {
              setSelectedArea(selectedArea === area ? null : area);
              setVisibleCount(12);
            }}
          >
            {area === "American" && (
              <img
                src="/banderas/Bandera_USA.png"
                alt="Bandera USA"
                className="w-5 h-5 rounded-full"
              />
            )}
            {area}
            {area === "British" && (
              <img
                src="/banderas/Bandera_UK.png"
                alt="Bandera UK"
                className="w-5 h-5 rounded-full"
              />
            )}
            {area === "Canadian" && (
              <img
                src="/banderas/Bandera_CA.png"
                alt="Bandera CA"
                className="w-5 h-5 rounded-full"
              />
            )}
            {area === "Chinese" && (
              <img
                src="/banderas/Bandera_CN.png"
                alt="bandera CN"
                className="w-5 h-5 rounded-full"
              />
            )}
            {area === "Croatian" && (
              <img
                src="/banderas/Bandera_CR.png"
                alt="bandera CR"
                className="w-5 h-5 rounded-full"
              />
            )}
            {area === "Dutch" && (
              <img
                src="/banderas/Bandera_NT.png"
                alt="bandera NT"
                className="w-5 h-5 rounded-full"
              />
            )}
            {area === "Egyptian" && (
              <img
                src="/banderas/Bandera_EG.png"
                alt="bandera EG"
                className="w-5 h-5 rounded-full"
              />
            )}
            {area === "Filipino" && (
              <img
                src="/banderas/Bandera_FP.png"
                alt="Bandera FP"
                className="w-5 h-5 rounded-full"
              />
            )}
            {area === "French" && (
              <img
                src="/banderas/Bandera_FR.png"
                alt="Bandera FR"
                className="w-5 h-5 rounded-full"
              />
            )}
            {area === "Greek" && (
              <img
                src="/banderas/Bandera_GR.png"
                alt="Bandera GR"
                className="w-5 h-5 rounded.full"
              />
            )}
            {area === "Indian" && (
              <img
                src="/banderas/Bandera_IN.png"
                alt="Bandera IN"
                className="w-5 h-5 rounded-full"
              />
            )}
            {area === "Irish" && (
              <img
                src="/banderas/Bandera_IR.png"
                alt="Bandera IR"
                className="w-5 h-5 rounded-full"
              />
            )}
            {area === "Italian" && (
              <img
                src="/banderas/Bandera_IT.png"
                alt="Bandera IT"
                className="w-5 h-5 rounded-full"
              />
            )}
            {area === "Jamaican" && (
              <img
                src="/banderas/Bandera_JMC.png"
                alt="Bandera JMC"
                className="w-5 h-5 rounded-full"
              />
            )}
            {area === "Japanese" && (
              <img
                src="/banderas/Bandera_JP.png"
                alt="Bandera JP"
                className="w-5 h-5 rounded-full"
              />
            )}
            {area === "Kenyan" && (
              <img
                src="/banderas/Bandera_KY.png"
                alt="Bandera KY"
                className="w-5 h-5 rounded-full"
              />
            )}
            {area === "Malaysian" && (
              <img
                src="/banderas/Bandera_MA.png"
                alt="Bandera MA"
                className="w-5 h-5 rounded-full"
              />
            )}
            {area === "Mexican" && (
              <img
                src="/banderas/Bandera_MX.png"
                alt="Bandera MX"
                className="w-5 h-5 rounded-full"
              />
            )}
            {area === "Moroccan" && (
              <img
                src="/banderas/Bandera_MR.png"
                alt="Bandera MR"
                className="w-5 h-5 rounded-full"
              />
            )}
            {area === "Polish" && (
              <img
                src="/banderas/Bandera_PL.png"
                alt="Bandera PL"
                className="w-5 h-5 rounded-full"
              />
            )}
            {area === "Portuguese" && (
              <img
                src="/banderas/Bandera_PG.png"
                alt="Bandera PG"
                className="w-5 h-5 rounded-full"
              />
            )}
            {area === "Russian" && (
              <img
                src="/banderas/Bandera_RS.png"
                alt="Bandera RS"
                className="w-5 h-5 rounded-full"
              />
            )}
            {area === "Spanish" && (
              <img
                src="/banderas/Bandera_SP.png"
                alt="Bandera SP"
                className="w-5 h-5 rounded-full"
              />
            )}
            {area === "Thai" && (
              <img
                src="/banderas/Bandera_TI.png"
                alt="Bandera TI"
                className="w-5 h-5 rounded-full"
              />
            )}
            {area === "Tunisian" && (
              <img
                src="/banderas/Bandera_TU.png"
                alt="Bandera TU"
                className="w-5 h-5 rounded-full"
              />
            )}
            {area === "Turkish" && (
              <img
                src="/banderas/Bandera_TK.png"
                alt="Bandera TK"
                className="w-5 h-5 rounded-full"
              />
            )}
            {area === "Ukrainian" && (
              <img
                src="/banderas/Bandera_UKA.png"
                alt="Bandera UKA"
                className="w-5 h-5 rounded-full"
              />
            )}
            {area === "Uruguayan" && (
              <img
                src="/banderas/Bandera_UR.png"
                alt="Bandera UR"
                className="w-5 h-5 rounded-full"
              />
            )}
            {area === "Vietnamese" && (
              <img
                src="/banderas/Bandera_VT.png"
                alt="Bandera VT"
                className="w-5 h-5 rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      {visibleRecipes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleRecipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>

          {visibleRecipes.length < filteredRecipes.length ? (
            <div className="text-center mt-6">
              <button
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-300 to-orange-400 text-white font-semibold text-lg rounded-full shadow-md hover:scale-105 transition-transform"
                onClick={() => setVisibleCount(visibleCount + 12)}
              >
                <FaCat className="text-white animate-pulse" />
                Explora las miaucetas exquisitas
              </button>
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No se encontraron recetas con esos filtros.
            </p>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">
          No se encontraron recetas con esos filtros.
        </p>
      )
      }
    </div >
  );
}

export default Home;