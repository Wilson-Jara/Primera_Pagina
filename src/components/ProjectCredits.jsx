// src/components/ProjectCredits.jsx
function ProjectCredits() {
  return (
    <div className="mt-8 p-6 bg-white rounded-md shadow text-left text-sm text-gray-700 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2 text-orange-600">🎓 Créditos del Proyecto</h2>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Creadores:</strong> Wilson Alexis Jara,Matías Alejandro Cabrera,Juan Pablo villarroel,Juan Cortez</li>
        <li><strong>Framework:</strong> React + Vite</li>
        <li><strong>Estilos:</strong> Tailwind CSS</li>
        <li><strong>API usada:</strong> <a href="https://www.themealdb.com/" target="_blank" rel="noopener noreferrer" className="text-orange-500 underline">TheMealDB</a></li>
        <li><strong>Diseño:</strong> Animaciones personalizadas y experiencia responsiva</li>
      </ul>
    </div>
  );
}

export default ProjectCredits;