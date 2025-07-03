const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const notesRoutes = require('./routes/notesRouter.js');
const userRoutes = require('./routes/userRouter.js');
const loginRoutes = require('./routes/loginRouter.js');

const app = express();
const swaggerDocument = YAML.load('./swagger.yaml');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to handle CORS
app.use(cors());

app.use('/api/notes', notesRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', loginRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;