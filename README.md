# DuaCode Project

Aplicación CRUD de usuarios construida con React, Vite, Node.js, MongoDB y TailwindCSS.
Permite listar, crear, editar y eliminar usuarios, con soporte multilenguaje (Español, Inglés, Gallego) y funcionalidades

## Tecnologías utilizadas

Frontend: React + Vite

Estilos: TailwindCSS

Backend / API: Node.js + Express

Base de datos: MongoDB (Atlas o local)

Internacionalización: react-i18next

Gestión de imágenes: Componente custom ImageManager

Date Picker: react-datepicker

Control de calidad: ESLint

Gestión de versiones: Git + GitHub

## Instalación y ejecución

Clonar el repositorio:
```git clone https://github.com/Belendguez/DuaCode-Demo.git```


Instalar dependencias:
```npm install```

Crear un .env con las siguientes credenciales:
MONGO_URI=mongodb+srv://<user>:<password>@testcluster.iivdn38.mongodb.net/reqres_test?retryWrites=true&w=majority
PORT=3000

Ejecutar la aplicación:
```npm run dev```
Esto iniciará Vite en modo desarrollo para el frontend.

El backend debe ejecutarse en paralelo:
```node server.js```
