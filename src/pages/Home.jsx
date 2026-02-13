import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { fetchUsers } from "@/services/api";
import UserCarousel from "@/components/UserCarousel";

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);

  // control de animaciones
  const [showSections, setShowSections] = useState([false, false, false]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        console.error("Error loading users:", err);
      }
    };
    loadUsers();
  }, []);

  // 👇 animación escalonada segura
  useEffect(() => {
    const timers = [];

    showSections.forEach((_, i) => {
      timers[i] = setTimeout(() => {
        setShowSections(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * 250);
    });

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-8">

      {/* Titulos */}
      {showSections[0] && (
        <div className="text-center animate-fadeInUp">
          <h1
            className="text-6xl text-center mb-4 drop-shadow-2xl animate-fadeInUp"
            style={{ fontFamily: '"Titan One", cursive', background: "linear-gradient(90deg, #06b6d4, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            {t("projectTitle")}
          </h1>
          <h2 className="text-xl text-foreground mb-12">
            {t("byAuthor")}
          </h2>
        </div>
      )}

      {/* Acciones */}
      {showSections[1] && (
        <div className="flex gap-8 mb-12 animate-fadeInUp">
            <button
              className="px-6 py-3 bg-green-500 text-white rounded-lg transform transition-all duration-300 hover:scale-105 hover:bg-green-600 shadow-lg"
              onClick={() => navigate("/createUser")}
            >
              {t("createUser")}
            </button>
            <button
              className="px-6 py-3 bg-blue-500 text-white rounded-lg transform transition-all duration-300 hover:scale-105 hover:bg-blue-600 shadow-lg"
              onClick={() => navigate("/users")}
            >
              {t("viewUsers")}
            </button>
        </div>
      )}

      

      {/* Carousel */}
      {users.length > 0 && showSections[2] && (
        <div className="animate-fadeInUp w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">
            {t("novelties")}
          </h2>
          <UserCarousel users={users} />
        </div>
      )}

    </div>
  );
}
