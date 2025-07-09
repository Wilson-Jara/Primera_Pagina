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
      // Hacemos las dos llamadas a la API al mismo tiempo
      const [categoriesData, areasData] = await Promise.all([
        getAllCategoriesList(),
        getAllAreasList(),
      ]);
      setCategories(categoriesData);
      setAreas(areasData);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center text-xl mt-10">Cargando opciones...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Explorar Recetas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Columna de Categorías */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 border-b-2 border-orange-400 pb-2">
            Por Categoría
          </h2>
          <div className="space-y-2">
            {categories.map((cat) => (
              <Link
                key={cat.strCategory}
                to={`/category/${cat.strCategory}`}
                className="block p-3 bg-blue-700 rounded-md shadow-sm hover:bg-orange-100 hover:shadow-md transition-all"
              >
                {cat.strCategory}
              </Link>
            ))}
          </div>
        </div>

        {/* Columna de Países */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 border-b-2 border-teal-400 pb-2">
            Por País
          </h2>
          <div className="space-y-2">
            {areas.map((area) => (
              <Link
                key={area.strArea}
                to={`/area/${area.strArea}`}
                className="block p-3 bg-white rounded-md shadow-sm hover:bg-teal-100 hover:shadow-md transition-all"
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