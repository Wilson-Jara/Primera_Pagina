import React from "react";

function CreditsPage() {
    return (
        <div className="felinic-wrapper min-h-screen p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Créditos del Proyecto</h1>

            <div className="bg-orange-50 rounded-xl p-6 shadow-lg max-w-xl mx-auto text-center text-[var(--text-color)]">
                {/* 👩 Imagen de la creadora */}
                <div className="mb-6">
                    <img
                        src="/gatos/jefa_G.jpg" // Asegúrate que esta ruta exista en /public
                        alt="Creadora de la página"
                        className="mx-auto rounded-full shadow-lg w-32 h-32 object-cover"
                    />
                    <p className="mt-4 font-semibold text-lg">🐾Creadora de la página🐾</p>
                </div>

                <p className="mb-4"><strong>Subditos:</strong></p>
                <p className="mb-2">Matías Alejandro Cabrera</p>
                <p className="mb-2">Wilson Alexis Jara</p>
                <p className="mb-2">Juan Pablo Villarroel</p>
                <p className="mb-4">Juan Cortez Gallardo</p>

                <p className="mb-4"><strong>Frontend:</strong> React + Vite</p>
                <p className="mb-4"><strong>Style components:</strong> Tailwind CSS</p>

                <div className="mb-4">
                    <p className="mb-2">
                        <strong>API usada:</strong>{" "}
                        <a
                            href="https://www.themealdb.com/api.php"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-600 underline hover:text-orange-800"
                        >
                            TheMealDB
                        </a>
                    </p>

                    <p className="text-sm text-orange-600">
                        🥘 Esta API permite acceder a recetas de distintas partes del mundo, con detalles como ingredientes, preparación e imagen. También ofrece formas divertidas de descubrir nuevas comidas, ya sea buscando por nombre o explorando al azar, aunque eso solo depende de como uno lo decida usar.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CreditsPage;