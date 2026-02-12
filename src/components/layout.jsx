import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Layout({ children }) {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-6 py-4 shadow-md flex justify-between items-center">
        <h1 className="text-lg font-bold">{t("menuTitle")}</h1>

        {/* Menú desktop */}
        <nav className="hidden md:flex space-x-4 items-center">
          <Link to="/">{t("home")}</Link>

          {/* Selector de idioma */}
          <select
            className="ml-4 px-2 py-1 rounded bg-background text-foreground"
            onChange={(e) => changeLanguage(e.target.value)}
            value={i18n.language}
          >
            <option value="es">ES</option>
            <option value="gl">GL</option>
            <option value="en">EN</option>
          </select>
        </nav>

        {/* Botón hamburguesa móvil */}
        <button
          className="md:hidden bg-primary-foreground text-primary px-2 py-1 rounded"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </header>

      {/* Menú móvil */}
      {menuOpen && (
        <nav className="flex flex-col md:hidden bg-primary text-primary-foreground px-6 py-2 space-y-2 transition-all duration-300 ease-in-out">
          <Link to="/" className="hover:underline" onClick={() => setMenuOpen(false)}>
            {t("home")}
          </Link>
          <Link to="/about" className="hover:underline" onClick={() => setMenuOpen(false)}>
            {t("about")}
          </Link>

          {/* Selector de idioma móvil */}
          <select
            className="mt-2 px-2 py-1 rounded bg-background text-foreground"
            onChange={(e) => {
              changeLanguage(e.target.value);
              setMenuOpen(false);
            }}
            value={i18n.language}
          >
            <option value="es">ES</option>
            <option value="gl">GL</option>
            <option value="en">EN</option>
          </select>
        </nav>
      )}

      {/* Contenido */}
      <main className="flex-1 p-6 bg-background">
        {children}
      </main>
    </div>
  );
}