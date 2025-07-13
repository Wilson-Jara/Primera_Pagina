// src/pages/RecipeDetail.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getMealById } from "../api/mealApi";
import {
  convertInstructionsToSI,
  convertIngredientMeasure,
} from "../utils/converters";

function RecipeDetail() {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const { recipeId } = useParams();
  const audioClickRef = useRef(null);
  const audioScrollRef = useRef(null);

  useEffect(() => {
    const fetchMealDetail = async () => {
      setLoading(true);
      const data = await getMealById(recipeId);
      setTimeout(() => {
        setMeal(data);
        setLoading(false);
      }, 2000);
    };
    fetchMealDetail();
  }, [recipeId]);

  useEffect(() => {
    const handleClick = () => {
      if (audioClickRef.current) {
        audioClickRef.current.currentTime = 0;
        audioClickRef.current.play().catch((err) =>
          console.warn("Error al reproducir maullido:", err)
        );
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (audioScrollRef.current) {
        audioScrollRef.current.currentTime = 0;
        audioScrollRef.current.play().catch((err) =>
          console.warn("Error al reproducir ronroneo:", err)
        );
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-orange-100">
        <img src="/gato.png" alt="Gato girando" className="w-40 h-40 mb-4" />
        <p className="text-xl text-center font-semibold text-orange-700 animate-pulse">
          Cargando receta... 🐱
        </p>
        <audio ref={audioClickRef} src="/gato.mp3" preload="auto" />
        <audio ref={audioScrollRef} src="/gatito.mp3" preload="auto" />
      </div>
    );
  }

  if (!meal) {
    return <p className="text-center text-xl mt-10">Receta no encontrada.</p>;
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (name && measure) {
      ingredients.push({
        name,
        measure: convertIngredientMeasure(measure),
      });
    } else {
      break;
    }
  }

  const instructions = convertInstructionsToSI(meal.strInstructions);

  return (
    <div className="max-w-4xl mx-auto bg-orange-300 p-6 rounded-lg shadow-lg relative">
      {/* Audios */}
      <audio ref={audioClickRef} src="/gato.mp3" preload="auto" />
      <audio ref={audioScrollRef} src="/gatito.mp3" preload="auto" />

      {/* Huellas en esquinas del contenedor */}
      <img src="/pata.png" alt="pata" className="absolute top-2 left-2 w-6 h-6 opacity-70 pointer-events-none" />
      <img src="/pata.png" alt="pata" className="absolute top-2 right-2 w-6 h-6 opacity-70 pointer-events-none" />
      <img src="/pata.png" alt="pata" className="absolute bottom-2 left-2 w-6 h-6 opacity-70 pointer-events-none" />
      <img src="/pata.png" alt="pata" className="absolute bottom-2 right-2 w-6 h-6 opacity-70 pointer-events-none" />

      <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
        {meal.strMeal} <span className="text-3xl animate-pulse">🔥</span>
      </h1>

      <div className="text-center mb-6">
        <span className="inline-block bg-orange-400 text-black px-3 py-1 rounded-full shadow-md animate-bounce font-semibold">
          🌟 Receta Estelar 🌟
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className="relative w-full">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full rounded-lg border-4 border-white animate-border-glow"
            />
            {/* 🐾 Cuatro huellas decorativas dentro del plato */}
            <img src="/pata.png" alt="pata" className="absolute top-2 left-2 w-5 h-5 opacity-80 pointer-events-none" />
            <img src="/pata.png" alt="pata" className="absolute top-2 right-2 w-5 h-5 opacity-80 pointer-events-none" />
            <img src="/pata.png" alt="pata" className="absolute bottom-2 left-2 w-5 h-5 opacity-80 pointer-events-none" />
            <img src="/pata.png" alt="pata" className="absolute bottom-2 right-2 w-5 h-5 opacity-80 pointer-events-none" />
          </div>
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
        {instructions.split("\n").map((text, i) => (
          <p key={i} className="mb-4 text-justify">
            {text}
          </p>
        ))}
      </div>

      <p className="text-center text-sm mt-6 italic text-gray-800">
        ✨ Esta receta fue aprobada por gatos gourmet. ¡Miau buen provecho! ✨
      </p>
    </div>
  );
}

export default RecipeDetail;