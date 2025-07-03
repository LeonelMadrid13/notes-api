const app = require('./src/index');
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`);
    // log all routes
    if (process.env.NODE_ENV !== 'production') {
        console.log('Development mode: Logging all routes');
        console.log('Available routes:');
        console.log('GET /api/notes -> Get all notes');
        console.log('POST /api/notes -> Create a new note');
        console.log('GET /api/notes/:id -> Get a note by ID');
        console.log('PUT /api/notes/:id -> Update a note by ID');
        console.log('DELETE /api/notes/:id -> Delete a note by ID');
        console.log('GET /api/users -> Get all users');
        console.log('POST /api/users -> Create a new user');
        console.log('POST /api/auth/login -> Login a user');
    }
});