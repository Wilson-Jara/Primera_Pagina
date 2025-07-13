const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const getRecipesByFirstLetter = async (letter) => {
  try {
    const response = await fetch(`${API_BASE_URL}/search.php?f=${letter}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching recipes by first letter:", error);
    return [];
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories.php`);
    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getMealsByCategory = async (categoryName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/filter.php?c=${categoryName}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meals by category:", error);
    return [];
  }
};

export const getMealById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error("Error fetching meal by id:", error);
    return null;
  }
};

export const searchMealsByName = async (name) => {
  try {
    const response = await fetch(`${API_BASE_URL}/search.php?s=${name}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error searching meals by name:", error);
    return [];
  }
};

export const getAllCategoriesList = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/list.php?c=list`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching categories list:", error);
    return [];
  }
};

export const getAllAreasList = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/list.php?a=list`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching areas list:", error);
    return [];
  }
};

export const getMealsByArea = async (areaName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/filter.php?a=${areaName}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meals by area:", error);
    return [];
  }
};

export const getRandomMealId = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/random.php`);
    const data = await response.json();
    return data.meals?.[0]?.idMeal || null;
  } catch (error) {
    console.error("Error fetching random meal:", error);
    return null;
  }
};