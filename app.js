require('dotenv').config();
const express = require('express');
const { PORT = 3000 } = process.env;
const app = express();
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());
mongoose.connect('mongodb://localhost:27017/ts31db');
app.use(cors());
app.use(require('./routes/index'));

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Слушаем порт ${PORT}`);
})