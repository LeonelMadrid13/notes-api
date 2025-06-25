
# 📌 Notes API  

A simple RESTful API to create, read, update, and delete notes. Built with Node.js and Express.js.

---

## 🛠️ Tech Stack

- **Language**: JavaScript (Node.js)
- **Framework**: Express.js
- **ORM**: Prisma
- **Database**: supabase

---

## 🔥 Features

- ✅ Create a new note  
- 📝 Read all or a single note  
- ✏️ Update a note  
- ❌ Delete a note  

- ✅ Create a new User  
- 📝 Get all users  
- ✏️ Update a user  
- ❌ Delete a user  

---

## 📦 API Endpoints

| Method | Endpoint         | Description         |
|--------|------------------|---------------------|
| GET    | `/api/notes`     | Get all notes       |
| GET    | `/api/notes/:id` | Get a specific note |
| POST   | `/api/notes`     | Create a new note   |
| PUT    | `/api/notes/:id` | Update a note       |
| DELETE | `/api/notes/:id` | Delete a note       |
|--------|------------------|---------------------|
| GET    | `/api/users`     | Get all notes       |
| GET    | `/api/users/:id` | Get a specific note |
| POST   | `/api/users`     | Create a new note   |
| PUT    | `/api/users/:id` | Update a note       |
| DELETE | `/api/users/:id` | Delete a note       |

---

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
