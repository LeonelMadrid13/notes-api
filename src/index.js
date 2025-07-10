import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import sanitizer from 'perfect-express-sanitizer';

import notesRoutes from './routes/notesRouter.js';
import userRoutes from './routes/userRouter.js';
import loginRoutes from './routes/loginRouter.js';
import utilsRouter from './routes/utilsRouter.js';

const app = express();
const swaggerDocument = YAML.load('./swagger.yaml');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to handle CORS
app.use(cors());

app.use(sanitizer.clean({
    xss: true,
    noSql: true,
    sql: true,
    sqlLevel: 5,
    noSqlLevel: 5
}));

app.use('/api', utilsRouter);
app.use('/api/notes', notesRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', loginRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`);
    // log all routes
    if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
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

export default app;