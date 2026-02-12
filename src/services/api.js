// =============================
// API JS
// =============================

const BASE_URL = "http://localhost:3000/users";

// =============================
// GET ALL USERS
// =============================
export async function fetchUsers() {
  const res = await fetch(BASE_URL, {
    method: "GET",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error fetching users");
  }

  return await res.json(); 
}

// =============================
// GET SINGLE USER
// =============================
export async function fetchUser(id) {
  const res = await fetch(`${BASE_URL}/${id}`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error fetching user");
  }

  return await res.json(); 
}

// =============================
// CREATE USER
// =============================
export async function createUser(userData) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData), 
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error creating user");
  }

  return await res.json(); 
}

// =============================
// UPDATE USER
// =============================
export async function updateUser(id, userData) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error updating user");
  }

  return await res.json(); 
}

// =============================
// DELETE USER
// =============================
export async function deleteUser(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error deleting user");
  }

  return true; 
}

