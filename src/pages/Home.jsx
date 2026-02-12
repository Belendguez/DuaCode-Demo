import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { fetchUsers } from "@/services/api";
import UserCarousel from "@/components/UserCarousel";

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);

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

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-8">
      {/* Títulos */}
      <h1 className="text-5xl font-extrabold mt-12 mb-2 text-center">
        {t("projectTitle")}
      </h1>
      <h2 className="text-xl text-foreground mb-12 text-center">
        {t("byAuthor")}
      </h2>

      {/* Botones */}
      <div className="flex gap-8 mb-12">
        <button
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          onClick={() => navigate("/createUser")}
        >
          {t("createUser")}
        </button>
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          onClick={() => navigate("/users")}
        >
          {t("viewUsers")}
        </button>
      </div>

      {/* Carousel de novedades */}
      {users.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4">{t("novelties")}</h2>
          <UserCarousel users={users} />
        </>
      )}
    </div>
  );
}
