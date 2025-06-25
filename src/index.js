import express from 'express';
import notesRoutes from './routes/notesRouter.js';
import userRoutes from './routes/userRouter.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/notes', notesRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`);
});