// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import RecipeDetail from "./pages/RecipeDetail";
import ExplorePage from "./pages/ExplorePage"; // <-- NUEVO IMPORT
import AreaPage from "./pages/AreaPage"; // <-- NUEVO IMPORT

function App() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header />

      <main className="p-4 md:p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explorar" element={<ExplorePage />} /> {/* <-- NUEVA RUTA */}
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/area/:areaName" element={<AreaPage />} /> {/* <-- NUEVA RUTA */}
          <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;