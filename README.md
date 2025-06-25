
# 📌 Notes API  
A simple RESTful API to create, read, update, and delete notes. Built with Node.js and Express.js.

---

## 🛠️ Tech Stack

- **Language**: JavaScript (Node.js)
- **Framework**: Express.js
- **Database**: In-memory (no DB for simplicity)

---

## 🔥 Features

- ✅ Create a new note  
- 📝 Read all or a single note  
- ✏️ Update a note  
- ❌ Delete a note  

---

## 📦 API Endpoints

| Method | Endpoint     | Description         |
|--------|--------------|---------------------|
| GET    | `/notes`     | Get all notes       |
| GET    | `/notes/:id` | Get a specific note |
| POST   | `/notes`     | Create a new note   |
| PUT    | `/notes/:id` | Update a note       |
| DELETE | `/notes/:id` | Delete a note       |

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
  "content": "Milk, Eggs, Bread"
}
```

---

## 📬 Contact
 
GitHub: [LeonelMadrid13](https://github.com/LeonelMadrid13)
