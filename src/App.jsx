// src/App.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";

// Componentes
import Header from "./components/Header";

// Páginas
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import RecipeDetail from "./pages/RecipeDetail";
import ExplorePage from "./pages/ExplorePage";
import AreaPage from "./pages/AreaPage";
import CreditsPage from "./pages/creditos";

// Estilos gatunos versión crema y naranja
import "./components/creamOrange.css"; // <- ¡Este es el archivo correcto!

function App() {
  return (
    <div className="felinic-wrapper">
      <Header />

      <main className="p-4 md:p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explorar" element={<ExplorePage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/area/:areaName" element={<AreaPage />} />
          <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
          <Route path="/creditos" element={<CreditsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;