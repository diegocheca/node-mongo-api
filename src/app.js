const express = require('express');
const bodyParser = require('body-parser')
const _connect = require('./db/_connect');
const userRoutes = require('./routes/userRouter');
const todoRoutes = require('./routes/todoRouter');
const mealTypeRoutes = require('./routes/mealTypeRoutes');
const addOnRoutes = require('./routes/addOnRoutes');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
// configurar dotenv
require('dotenv').config()

// mongo connection
_connect();

const app = express();

// setup
app.use(bodyParser.json())

// Routes
app.use('/account', userRoutes);
app.use('/todos', todoRoutes);
app.use('/mealtype', mealTypeRoutes);
app.use('/addon', addOnRoutes);


app.listen(process.env.PORT, () => console.log('App listening on PORT ' + process.env.PORT))