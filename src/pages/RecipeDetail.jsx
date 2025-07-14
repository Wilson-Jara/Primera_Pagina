import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  convertInstructionsToSI,
  convertIngredientMeasure,
} from "../utils/converters";
import "../components/creamOrange.css";
import { getMealById, getRandomMealId } from "../api/mealApi";

function RecipeDetail() {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const audioClickRef = useRef(null);
  const audioScrollRef = useRef(null);

  // 🎧 Audios disponibles globalmente
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

  useEffect(() => {
    const fetchMealDetail = async () => {
      setLoading(true);
      const data = await getMealById(recipeId);
      setTimeout(() => {
        setMeal(data);
        setLoading(false);
      }, 1500); // 🕐 Delay para mostrar el gato animado
    };
    fetchMealDetail();
  }, [recipeId]);

  // 🐾 Mostrar carga con animación gatuna
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[var(--bg-color)]">
        <img
          src="/gatos/gato.png"
          alt="Gato girando"
          className="w-56 h-56 mb-6 gatito-moviendo"
        />
        <p className="text-3xl font-bold text-[var(--text-color)] animate-pulse text-center">
          🍽️ Cargando receta...
        </p>
        <audio ref={audioClickRef} src="/gatos/gato.mp3" preload="auto" />
        <audio ref={audioScrollRef} src="/gatos/gatito.mp3" preload="auto" />
      </div>
    );
  }

  if (!meal) {
    return (
      <p className="text-center text-xl mt-10 text-[var(--text-color)]">
        Receta no encontrada.
      </p>
    );
  }

  const categoryPhrases = {
    Beef: "Una receta que hará maullar fuerte 🐮",
    Breakfast: " Conquista la mañana como un felino hambriento🐾",
    Chicken: "Pechuguita miauliciosa en camino 🐔",
    Seafood: "Del mar al paladar felino 🐟",
    Miscellaneous: "🐾Sabores que hacen ronronear hasta al más gruñón🐾",
    Vegetarian: "Verde, fresco y purr-fecto 🌿",
    Dessert: "Dulce como un gatito dormido 🧁",
    Pasta: "Pasta que ronronea de gusto 🍝",
    Lamb: "Tierno y digno de un bigote gourmet 🐑",
    Pork: "Un cerdito tan sabroso que hasta los gatos hacen fila🐖",
    Side: "Sabores que se acurrucan al lado de tu plato principal🐈",
    Starter: "Un comienzo que hará ronronear a tu estómago 🐾",
    Vegan: "Verde, fresco y purr-fecto 🌱",
  };

  const themedCategoryPhrase =
    categoryPhrases[meal.strCategory] ||
    "Más recetas miauliciosas por descubrir 🐾";

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
    <div className="max-w-4xl mx-auto bg-[var(--card-bg)] p-6 rounded-xl shadow-md relative">
      <audio ref={audioClickRef} src="/gatos/gato.mp3" preload="auto" />
      <audio ref={audioScrollRef} src="/gatos/gatito.mp3" preload="auto" />

      {/* Huellitas decorativas */}
      <img
        src="/gatos/pata.png"
        alt="huella"
        className="absolute top-2 left-2 w-6 h-6 opacity-50"
      />
      <img
        src="/gatos/pata.png"
        alt="huella"
        className="absolute top-2 right-2 w-6 h-6 opacity-50"
      />

      <h1 className="text-4xl font-bold mb-4 text-[var(--text-color)] flex items-center gap-2">
        {meal.strMeal} <span className="text-3xl animate-bounce">🍽️</span>
      </h1>

      <div className="mb-6 text-center">
        <span className="inline-block bg-[var(--primary-color)] text-white px-4 py-1 rounded-full font-semibold shadow-lg animate-pulse">
          🌟 Receta Estelar 🌟
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 relative">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full rounded-xl border-4 border-[var(--soft-white)] shadow-xl"
          />
          <p className="text-[var(--text-color)] mt-2 text-sm">
            <strong>Categoría:</strong> {meal.strCategory} |{" "}
            <strong>Origen:</strong> {meal.strArea}
          </p>
        </div>

        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-3 text-[var(--text-color)]">
            Ingredientes
          </h2>
          <ul className="list-disc list-inside space-y-1 text-[var(--text-color)]">
            {ingredients.map((ing, index) => (
              <li key={index}>
                {ing.name} – <strong>{ing.measure}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-3 text-[var(--text-color)]">
          Instrucciones
        </h2>
        {instructions.split("\n").map((text, i) => (
          <p key={i} className="mb-4 text-justify text-[var(--text-color)]">
            {text}
          </p>
        ))}
      </div>

      {/* 🐾 Botones finales con frases temáticas */}
      <div className="mt-6 text-center flex flex-col md:flex-row gap-4 justify-center items-center">
        <button
          className="felinic-button"
          onClick={() => navigate(`/category/${meal.strCategory}`)}
        >
          <span>
            Recetas similares
            <br />
            <small>{themedCategoryPhrase}</small>
          </span>
        </button>

        <button
          className="felinic-button"
          onClick={async () => {
            const randomId = await getRandomMealId();
            if (randomId) {
              navigate(`/recipe/${randomId}`);
            } else {
              alert("No se encontró una receta aleatoria 🐾");
            }
          }}
        >
          <span>
            Receta al azar
            <br />
            <small>
              ¿Quién sabe? Quizás algo *miaulicioso* te espera 😸
            </small>
          </span>
        </button>
      </div>

      <p className="mt-7 italic text-[#141313] text-sm text-center">

        ✨ Receta aprobada por felinos gourmet. ¡Miau buen provecho! ✨
      </p>
    </div>
  );
}

export default RecipeDetail;