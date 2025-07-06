// src/utils/converters.js

// --- CONVERSIÓN DE TEMPERATURA (Esta parte se queda igual) ---

function fahrenheitToCelsius(fahrenheit) {
  return Math.round(((fahrenheit - 32) * 5) / 9);
}

export function convertInstructionsToSI(instructions) {
  if (!instructions) return "";
  const fahrenheitRegex = /(\d+)\s*(degrees F|Fahrenheit|F)\b/gi;
  return instructions.replace(fahrenheitRegex, (match, tempFahrenheit) => {
    const tempInF = parseInt(tempFahrenheit, 10);
    const tempInC = fahrenheitToCelsius(tempInF);
    return `${tempInC} °C`;
  });
}

// --- NUEVO: SISTEMA DE CONVERSIÓN DE INGREDIENTES (VERSIÓN CORREGIDA) ---

// 1. Tablas de conversión ÚNICAMENTE para unidades que queremos cambiar.
// Dejamos fuera 'cup', 'tsp', 'tbsp' a propósito.
const imperialVolumeConversions = {
  "fl oz": 30, // Onza fluida -> ml
  pint: 473,
  quart: 946,
  gallon: 3785,
};

const imperialWeightConversions = {
  oz: 28.35, // Onza -> g
  ounce: 28.35,
  lb: 453.59, // Libra -> g
  pound: 453.59,
};

// 2. Función auxiliar para analizar cantidades (ej. "1 1/2" -> 1.5)
function parseQuantity(quantityStr) {
  if (!quantityStr) return 0;
  quantityStr = quantityStr.trim();
  if (quantityStr.includes("/")) {
    const parts = quantityStr.split(" ");
    let total = 0;
    parts.forEach((part) => {
      if (part.includes("/")) {
        const [num, den] = part.split("/");
        total += parseFloat(num) / parseFloat(den);
      } else {
        total += parseFloat(part);
      }
    });
    return total;
  }
  return parseFloat(quantityStr);
}

// 3. La función principal de conversión (ahora más simple)
// Ya no necesita el nombre del ingrediente.
export function convertIngredientMeasure(measureStr) {
  if (!measureStr) return "";

  const match = measureStr.match(/^([\d\s/.-]+)\s*(.*)$/);
  if (!match) return measureStr; // No es un formato que entendamos, devolver original

  const [, quantityStr, unitStr] = match;
  const quantity = parseQuantity(quantityStr);
  const unit = unitStr.toLowerCase().replace(/s$/, ""); // Poner en minúscula y quitar la 's' final

  // A. ¿Es una unidad de peso imperial? Convertir a gramos o kilogramos.
  if (imperialWeightConversions[unit]) {
    const grams = quantity * imperialWeightConversions[unit];
    return grams < 1000
      ? `${Math.round(grams)} g`
      : `${(grams / 1000).toFixed(1)} kg`;
  }

  // B. ¿Es una unidad de volumen imperial? Convertir a mililitros o litros.
  if (imperialVolumeConversions[unit]) {
    const ml = quantity * imperialVolumeConversions[unit];
    return ml < 1000 ? `${Math.round(ml)} ml` : `${(ml / 1000).toFixed(1)} L`;
  }

  // C. Si no es una unidad a convertir (ej. cups, tsp), devolver la original.
  return measureStr;
}