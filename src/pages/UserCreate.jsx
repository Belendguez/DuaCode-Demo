// =============================
// USERCREATE.JSX
// =============================
// Crea el Usuario. Solo Nombre y Email.
// Se le asigna al usuario el avatar por default.
// =============================

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "@/services/api";
import { useTranslation } from "react-i18next";

export default function UserCreater() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: "",
    email: ""
  });

  const [creating, setCreating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email.includes("@")) {
        alert(t("enterValidNameEmail"));
        return;
    }

    setCreating(true);

    try {
        const payload = {
        ...form,
        avatar: "/img/profile.svg",
        };

        const newUser = await createUser(payload); 
        navigate(`/edit/${newUser._id}`);          
    } catch (err) {
        console.error("Error creando usuario:", err);
        alert(t("createUserError"));
    } finally {
        setCreating(false);
    }
    };


  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{t("createUser")}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder={t("name")}
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="p-2 border rounded"
          required
        />

        <input
          type="email"
          placeholder={t("email")}
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="p-2 border rounded"
          required
        />

        <button
          type="submit"
          disabled={creating}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          {creating ? t("creating") : t("createUser")}
        </button>
      </form>
    </div>
  );
}
