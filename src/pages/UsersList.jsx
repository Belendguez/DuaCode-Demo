// =============================
// USERLIST.JSX
// =============================
// Pantalla que refleja la lista de usuarios.
// Funciones:
//   - Mostrar Usuario (Avatar, Nombre y Correo)
//   - Buscar Usuario (Por Nombre)
//   - Ordenar Usuarios (Por Orden Alfabetico Ascendente o Descendente)
//   - Editar Usuarios
//   - Eliminar Usuarios
//   - Paginacion (4 Usuarios por pagina) + Navegacion de páginas
// =============================

import { useEffect, useState, useMemo } from "react";
import { fetchUsers, deleteUser } from "@/services/api";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";

export default function UsersList() {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const USERS_PER_PAGE = 4;

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await fetchUsers();
      const usersArray = res.map((user) => ({
        ...user,
        avatar: user.avatar || "/img/profile.svg",
      }));
      setUsers(usersArray);
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm(t("confirmDeleteUser"))) return;

    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
      alert(t("deleteUserError"));
    }
  };


  const filteredUsers = useMemo(() => {
    let filtered = users.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );
    filtered.sort((a, b) =>
      sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    return filtered;
  }, [users, search, sortAsc]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * USERS_PER_PAGE,
    page * USERS_PER_PAGE
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{t("usersList")}</h1>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <Link
          to="/createUser"
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition"
        >
          {t("createUser")}
        </Link>

        {/*Buscador + Orden*/}
        <div className="flex gap-1 md:gap-2 items-center">
          <input
            type="text"
            placeholder={t("searchByName")}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border p-2 rounded w-48"
          />
          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="px-3 py-2 bg-blue-500 text-white rounded hover:opacity-90 transition flex items-center justify-center"
            title={sortAsc ? "Orden ascendente" : "Orden descendente"}
          >
            {sortAsc ? "↑" : "↓"}
          </button>
        </div>
      </div>


      {/*Lista de usuarios */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-muted rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-1/3" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {paginatedUsers.length === 0 ? (
            <p>{t("noUsers")}</p>
          ) : (
          <ul className="space-y-4">
            {paginatedUsers.map((user, i) => (
              <li key={user._id}>
                <Card
                  className="rounded-2xl transform transition duration-300 ease-out hover:scale-[1.02] hover:shadow-2xl
                              opacity-0 translate-y-4 animate-fadeIn"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4">
                    {/*Avatar + info*/}
                    <div
                      onClick={() => navigate(`/user/${user._id}`)}
                      className="flex items-center gap-4 flex-1 cursor-pointer transition"
                    >
                      <div className="relative w-12 h-12">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-12 h-12 rounded-full border object-cover transition-transform duration-200 hover:scale-105"
                        />
                      </div>

                      <div>
                        <p className="font-semibold">{user.name || "Unnamed"}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>

                    {/*Acciones*/}
                    <Link
                      to={`/edit/${user._id}`}
                      className="px-3 py-1 rounded text-white transition 
                                bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
                    >
                      {t("editUser")}
                    </Link>

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="px-3 py-1 rounded text-white transition
                                bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                    >
                      {t("deleteUser")}
                    </button>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
          )}

          {/*Paginación*/}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              >
                ←
              </button>
              <span>
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              >
                →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

