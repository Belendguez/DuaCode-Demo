// =============================
// SERVER.JS
// =============================
//Backend que funciona con MongoDB para hacer las pruebas.
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

//Conexión a MongoDB Atlas. Hardcodeado para que funcione. (No lo editen o no habrá conexión)
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Modelo del Usuario (Información del usuario para usar en el front)
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String, default: "/img/profile.svg" },
    images: { type: [String], default: [] },
    birthDate: { type: Date, default: null },
    phone: { type: String, default: null },
    city: { type: String, default: null },
    bio: { type: String, default: null },
    website: { type: String, default: null },
    company: { type: String, default: null },
    
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

// =============================
// ENDPOINTS CRUD
// =============================

// Obtener todos los usuarios
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener usuario por ID
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear usuario
app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Actualizar usuario
app.patch("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar usuario
app.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Servidor escuchando
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
