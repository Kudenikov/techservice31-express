require('dotenv').config();
const express = require('express');
const { PORT = 5000 } = process.env;
const app = express();
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

const fileUpload = require('express-fileupload');

app.use(fileUpload({
    createParentPath: true,
}));

app.use('/static', express.static(__dirname + '/public'));

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ts31db');
app.use(cors());
app.use(require('./routes/index'));

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Слушаем порт ${PORT}`);
})