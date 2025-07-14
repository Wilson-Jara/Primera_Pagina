import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCategoriesList, getAllAreasList } from "../api/mealApi";

import { FaUtensils } from "react-icons/fa";
import { GiEarthAfricaEurope } from "react-icons/gi";

import { motion } from "framer-motion";

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
        // Delay entre 1 y 2 segundos como máximo
        const delay = Math.floor(Math.random() * 1000) + 1000; // 1000–2000ms
        setTimeout(() => {
          setLoading(false);
        }, delay);
      }
    };
    fetchData();
  }, []);

  // 🐾 Animación de carga con imagen felina
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[var(--card-bg)]">
        <img
          src="/gatos/Gato_Saltando.png"
          alt="Gato saltando"
          className="w-40 h-40 mb-6 animate-bounce opacity-80"
        />
        <p className="text-xl md:text-2xl font-semibold text-[var(--text-color)] animate-pulse text-center">
          Cargando opciones para explorar...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-400 to-yellow-500 drop-shadow-md border-b-4 border-orange-400 pb-4 rounded">
        Explorar Recetas Miauliciosas
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* 🍱 Categorías */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4 border-b-2 border-amber-400 pb-2">
            Por Categoría
          </h2>
          <div className="space-y-2">
            {categories.map((cat) => (
              <Link
                key={cat.strCategory}
                to={`/category/${cat.strCategory}`}
                className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-200 to-amber-300 rounded-md shadow hover:scale-105 hover:shadow-lg transition-transform dark:bg-gray-800 dark:text-white"
              >
                <FaUtensils className="text-orange-500" />
                <span>{cat.strCategory}</span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* 🌐 Países */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4 border-b-2 border-orange-400 pb-2">
            Por País
          </h2>
          <div className="space-y-2">
            {areas.map((area) => (
              <Link
                key={area.strArea}
                to={`/area/${area.strArea}`}
                className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-400 to-amber-200 rounded-md shadow hover:scale-105 hover:shadow-lg transition-transform dark:bg-gray-800 dark:text-white"
              >
                <GiEarthAfricaEurope className="text-white" />
                <span>{area.strArea}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ExplorePage;