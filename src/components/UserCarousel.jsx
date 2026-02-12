// =============================
// ImageManager.JSX
// =============================
// Componente el Carousel de Novedades
// Funciones:
//   - Muestra el avatar de cada usuario
//   - Permite avanzar o retroceder en el carousel usando las flechas o los indicadores de posición.
//   - Al dar click en una de las imagenes, se produce un link a los detalles del usuario.
// =============================

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function UserCarousel({ users = [] }) {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const intervalRef = useRef(null);
  const startX = useRef(0);

  const startAutoPlay = () => {
    stopAutoPlay();
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev === users.length - 1 ? 0 : prev + 1));
    }, 3500);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (!users.length) return;
    startAutoPlay();
    return () => stopAutoPlay();
  }, [users.length]);

  if (!users.length) return null;

  const prev = () =>
    setCurrent((prev) => (prev === 0 ? users.length - 1 : prev - 1));

  const next = () =>
    setCurrent((prev) => (prev === users.length - 1 ? 0 : prev + 1));

  // 👉 Swipe táctil
  const handleTouchStart = (e) => {
    startX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches
      ? e.changedTouches[0].clientX
      : e.clientX;

    const diff = startX.current - endX;

    if (diff > 50) next();
    if (diff < -50) prev();
  };

  return (
    <div
      className="relative w-full max-w-4xl mx-auto overflow-hidden"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* SLIDER TRACK */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {users.map((user) => (
          <div
            key={user._id}
            className="min-w-full h-64 md:h-80 cursor-pointer"
            onClick={() => navigate(`/user/${user._id}`)}
          >
            <img
              src={user.avatar || "/img/profile.svg"}
              alt={user.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Flechas */}
      <button
        onClick={prev}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:scale-110 transition"
      >
        ←
      </button>

      <button
        onClick={next}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:scale-110 transition"
      >
        →
      </button>

      {/* Indicadores */}
      <div className="flex justify-center mt-2 gap-2">
        {users.map((_, i) => (
          <span
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              i === current ? "bg-blue-500 scale-125" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

