const express = require('express');
const cors = require('cors');

const notesRoutes = require('./routes/notesRouter.js');
const userRoutes = require('./routes/userRouter.js');
const loginRoutes = require('./routes/loginRouter.js');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to handle CORS
app.use(cors());

app.use('/api/notes', notesRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', loginRoutes);

module.exports = app;