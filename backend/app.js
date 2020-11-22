const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const path = require('path');
const cardsRouter = require('./routes/cards').router;
const usersRouter = require('./routes/users').router;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '5f69e9aad2cb943eacb95f17',
  };

  next();
});
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Ссылка на сервер - http://localhost:${PORT}`);
});
