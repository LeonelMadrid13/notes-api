
# 📌 Notes API  

RESTful API for a full-stack notes app. Built with Express, Prisma, JWT auth, and Swagger docs. Supports users, notes, and role-based admin access.

---

## 🔧 Tech Stack

- **Express.js** – Fast and lightweight Node.js server
- **Prisma ORM** – Database modeling and querying
- **PostgreSQL** – (or your current DB)
- **JWT Authentication** – Secure login and route protection
- **Swagger UI** – Interactive API documentation
- **Role-Based Access Control** – Admin & regular users

---

## 📌 Features

- ✅ **User Registration & Login**  
  Secure signup and login using **hashed passwords** and **JWT-based authentication**.

- 🔐 **Role-Based Access Control (RBAC)**  
  Distinguish between **admin** and **regular** users for protected routes and permissions.

- 🧾 **Notes Management**  
  CRUD operations for user-specific notes — create, read, update, and delete.

- 📄 **Swagger UI Documentation**  
  Automatically generated, interactive API docs available at `/api-docs`.

- 🧠 **Middleware for Auth & Access**  
  Token verification, `requireAdmin`, and `requireSelfOrAdmin` middleware to guard sensitive routes.

- 🗂️ **Modular Express Routing**  
  Clean separation of concerns between controllers, middleware, and routes.

- ⚙️ **Environment-Based Configuration**  
  Uses `.env` for DB connection, secret keys, and port config.

---

## 📚 Live API Docs

> 🔗 [Swagger UI](https://notes-api-1-ffgg.onrender.com/api-docs/)

## 🚀 Getting Started

```bash
git clone https://github.com/LeonelMadrid13/notes-api.git
cd notes-api
npm install
npm run dev
```

---

## ▶️ Example

```json
POST /notes
{
  "title": "Shopping List",
  "content": "Milk, Eggs, Bread",
  "user" : "cmcbl68690000ekc8hjobey0f"
}
```

---

## 📬 Contact

GitHub: [LeonelMadrid13](https://github.com/LeonelMadrid13)
