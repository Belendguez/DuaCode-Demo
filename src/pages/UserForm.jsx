// =============================
// USERFORM.JSX
// =============================
// Permite Editar y añadir los campos extra del usuario.
// Validaciones:
//  - Las Imagenes deben ser insertadas mediante una URL válida.
//  - El nombre debe tener mas de 2 letras
//  - El Correo debe tener un formato correcto
//  - La pagina web debe tener un formato válido y existir.
//  - La fecha de nacimiento no puede ser una fecha a futuro
// =============================

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUser, updateUser, createUser } from "@/services/api";
import { useTranslation } from "react-i18next";
import ImageManager from "@/components/ImageManager";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function UserForm({ isEdit }) {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showSections, setShowSections] = useState([false, false, false, false, false, false]); 

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    bio: "",
    website: "",
    company: "",
    avatar: "",
    images: [],
    birthDate: null,
  });

  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    if (isEdit) {
      fetchUser(id).then((user) => {
        setForm({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          city: user.city || "",
          bio: user.bio || "",
          website: user.website || "",
          company: user.company || "",
          avatar: user.avatar || "",
          images: user.images || [],
          birthDate: user.birthDate ? new Date(user.birthDate) : null,
        });
        setAvatarPreview(user.avatar || "");
      });
    }
  }, [id, isEdit]);

  // Animación escalonada
  useEffect(() => {
    const timers = [];
    showSections.forEach((_, i) => {
      timers[i] = setTimeout(() => {
        setShowSections((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * 150); // 150ms entre cada sección
    });
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  const handleAvatarUrlChange = (e) => {
    const url = e.target.value;
    setForm((prev) => ({ ...prev, avatar: url }));
    setAvatarPreview(url);
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name || form.name.trim().length < 2) newErrors.name = t("nameRequired");
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = t("emailInvalid");
    if (form.phone && !/^\d{7,15}$/.test(form.phone)) newErrors.phone = t("phoneInvalid");
    if (form.website) {
      try { new URL(form.website); } catch { newErrors.website = t("websiteInvalid"); }
    }
    if (form.birthDate && form.birthDate > new Date()) newErrors.birthDate = t("birthDateInvalid");
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      if (isEdit) await updateUser(id, form);
      else await createUser(form);
      navigate(isEdit ? `/user/${id}` : "/users");
    } catch (err) {
      console.error(err);
      alert(t("submitError"));
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 animate-fadeInUp">{isEdit ? t("editUser") : t("createUser")}</h1>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        {/* Avatar URL */}
        {showSections[0] && (
          <div className="flex flex-col items-center animate-fadeInUp">
            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="Avatar preview"
                className="w-24 h-24 rounded-full object-cover mb-2"
              />
            )}
            <input
              type="text"
              placeholder={t("avatarUrl")}
              value={form.avatar}
              onChange={handleAvatarUrlChange}
              className="p-2 border rounded w-full"
            />
            {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar}</p>}
          </div>
        )}

        {/* Campos */}
        {showSections[1] &&
          ["name", "email", "phone", "city", "website", "company", "bio"].map((field) => (
            <div key={field} className="flex flex-col animate-fadeInUp">
              <input
                type={field === "email" ? "email" : "text"}
                placeholder={t(field)}
                value={form[field] || ""}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, [field]: e.target.value }))
                }
                className="p-2 border rounded"
              />
              {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
            </div>
          ))}

        {/* Fecha de nacimiento */}
        {showSections[2] && (
          <div className="flex flex-col gap-1 animate-fadeInUp">
            <label className="font-medium">{t("birthDate")}</label>
            <DatePicker
              selected={form.birthDate}
              onChange={(date) =>
                setForm((prev) => ({ ...prev, birthDate: date }))
              }
              dateFormat="yyyy-MM-dd"
              maxDate={new Date()}
              placeholderText={t("selectBirthDate")}
              className="p-2 border rounded w-full"
            />
            {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate}</p>}
          </div>
        )}

        {/* Gestor de Imagenes */}
          {showSections[3] && (
              <ImageManager
                images={form.images}
                onChange={(updated) => setForm((prev) => ({ ...prev, images: updated }))}
              />
          )}

        {/* Botón */}
        {showSections[4] && (
          <div className="flex justify-end animate-fadeInUp">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              {isEdit ? t("saveChanges") : t("submit")}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}



