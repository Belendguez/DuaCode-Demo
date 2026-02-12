// src/components/UserCarousel.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserCarousel({ users = [] }) {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  

  if (!users.length) return null;

  const prev = () => setCurrent((prev) => (prev === 0 ? users.length - 1 : prev - 1));
  const next = () => setCurrent((prev) => (prev === users.length - 1 ? 0 : prev + 1));

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Imagen principal */}
      <div
        className="w-full h-64 md:h-80 rounded-lg overflow-hidden cursor-pointer"
        onClick={() => navigate(`/user/${users[current]._id}`)}
      >
        <img
          src={users[current].avatar || "/img/profile.svg"}
          alt={users[current].name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Flechas */}
      <button
        onClick={prev}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2"
      >
        ←
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2"
      >
        →
      </button>

      {/* Indicadores de usuarios */}
      <div className="flex justify-center mt-2 gap-2">
        {users.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === current ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}