// =============================
// USERDETAIL.JSX
// =============================
// Muestra la informacion extra del usuario.
// Si algun campo esta vacio se muestra el icono (-)
// Si no existen imagenes en la galería o biografía no se renderizan.
// Se puede usar el boton Edit User para acceder a la pantalla de edición
// =============================
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUser } from "@/services/api";
import { useTranslation } from "react-i18next";
import Carousel from "@/components/Carousel";

export default function UserDetails() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSections, setShowSections] = useState([false, false, false, false, false]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        const data = await fetchUser(id);
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [id]);


  useEffect(() => {
    if (!user) return;
    const timers = [];
    showSections.forEach((_, i) => {
      timers[i] = setTimeout(() => {
        setShowSections((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * 200); 
    });
    return () => timers.forEach((t) => clearTimeout(t));
  }, [user]);

  if (loading) return <p>{t("loadingUser")}</p>;
  if (!user) return <p>{t("userNotFound")}</p>;

  const images = user.images?.length ? user.images : [];
  

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      {/* Avatar */}
      {showSections[0] && (
        <div className="flex flex-col md:flex-row items-center gap-6 bg-background p-6 rounded-2xl shadow animate-fadeInUp">
          <img
            src={user.avatar || "/img/profile.svg"}
            alt={user.name}
            className="w-32 h-32 rounded-full border"
          />
          <div className="flex-1 space-y-2 text-left">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p><strong>{t("email")}:</strong> {user.email}</p>
            <p><strong>{t("phone")}:</strong> {user.phone || "-"}</p>
            <p><strong>{t("city")}:</strong> {user.city || "-"}</p>
            <p>
              <strong>{t("birthDate")}:</strong>{" "}
              {user.birthDate
                ? new Date(user.birthDate).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "-"}
            </p>
          </div>
        </div>
      )}

      {/* Sección Empresa */}
      {showSections[1] && (
        <div className="bg-background p-6 rounded-2xl shadow animate-fadeInUp">
          <h2 className="text-xl font-semibold mb-2">{t("companyData")}</h2>
          <p><strong>{t("company")}:</strong> {user.company || "-"}</p>
          <p>
            <strong>{t("website")}:</strong>{" "}
            {user.website ? (
              <a
                href={user.website.startsWith("http") ? user.website : `https://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {user.website}
              </a>
            ) : "-"}
          </p>
        </div>
      )}

      {/* Sección Bio */}
      {user.bio && showSections[2] && (
        <div className="bg-background p-6 rounded-2xl shadow animate-fadeInUp">
          <h2 className="text-xl font-semibold mb-2">{t("bio")}</h2>
          <p>{user.bio}</p>
        </div>
      )}

      {/* Galeria */}
      {images.length > 0 && showSections[3] && (
        <div className="bg-background p-6 rounded-2xl shadow animate-fadeInUp">
          <h2 className="text-xl font-semibold mb-4">{t("userImages")}</h2>
          <Carousel images={images} />
        </div>
      )}

      {/* Editar */}
      {showSections[4] && (
        <div className="flex justify-end animate-fadeInUp">
          <button
            onClick={() => navigate(`/edit/${id}`)}
            className="px-4 py-2 bg-yellow-500 text-white rounded"
          >
            {t("editUser")}
          </button>
        </div>
      )}

    </div>
  );
}


