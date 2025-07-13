const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const authRouter = require('./Routes/AuthRouter');
const todoRouter = require('./Routes/TodoRouter');

require("dotenv").config();
require("./Models/db");

app.use(express.json());

app.use(bodyParser.json());
app.use(cors());
app.use('/api', authRouter);
app.use('/api', todoRouter);


mongoose.connect("mongodb://localhost:27017/Users");

app.get('/', (req, res) => {
    res.send('Hello World!')})


app.listen(PORT, () => console.log('Server running on port 8080'));