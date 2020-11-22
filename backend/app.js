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
const { createUser, login } = require('./controllers/users.js');
const auth = require('./middlewares/auth.js');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/cards', auth, cardsRouter);
app.use('/users', auth, usersRouter);

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Ссылка на сервер - http://localhost:${PORT}`);
});
