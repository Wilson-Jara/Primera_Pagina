// src/pages/ExplorePage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCategoriesList, getAllAreasList } from "../api/mealApi";

function ExplorePage() {
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoriesData, areasData] = await Promise.all([
          getAllCategoriesList(),
          getAllAreasList(),
        ]);
        setCategories(categoriesData);
        setAreas(areasData);
      } catch (error) {
        console.error("Error al cargar las opciones:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🔄 Bloque con animación de carga
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-amber-400"></div>
        <p className="mt-4 text-amber-500 text-xl">
          🍴 Cargando opciones para explorar...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Explorar Recetas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Columna de Categorías */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 border-b-2 border-amber-400 pb-2">
            Por Categoría
          </h2>
          <div className="space-y-2">
            {categories.map((cat) => (
              <Link
                key={cat.strCategory}
                to={`/category/${cat.strCategory}`}
                className="block p-3 bg-orange-150 rounded-md shadow-sm hover:bg-orange-200 hover:shadow-md transition-all"
              >
                {cat.strCategory}
              </Link>
            ))}
          </div>
        </div>

        {/* Columna de Países */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 border-b-2 border-orange-400 pb-2">
            Por País
          </h2>
          <div className="space-y-2">
            {areas.map((area) => (
              <Link
                key={area.strArea}
                to={`/area/${area.strArea}`}
                className="block p-3 bg-amber-150 rounded-md shadow-sm hover:bg-amber-200 hover:shadow-md transition-all"
              >
                {area.strArea}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;