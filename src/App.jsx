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
    <div
      className="min-h-screen font-sans bg-orange-200"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 C 30 60, 70 0, 100 30 L100 100 L0 100 Z' fill='%23fb923c' opacity='0.2' /%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat"
      }}
    >
      <Header />

      <main className="p-4 md:p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explorar" element={<ExplorePage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/area/:areaName" element={<AreaPage />} />
          <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;