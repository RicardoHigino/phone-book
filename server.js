require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const helmet = require('helmet');
const csrf = require('csurf');
const path = require('path');

// Middlewares & Routes
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');
const routes = require('./routes');

// Constantes de Configuração
const connectionString = process.env.DB_CONNECTION_STRING;
const sessionSecret = process.env.SECURITY_SESSION_SECRET;
const port = process.env.PORT || 3000;

// Configurações do Servidor
const app = express();
app.use(helmet());

// Conexão com o banco de dados
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => app.emit('Ready'))
  .catch(e => console.error(`Erro ao conectar no banco de dados: ${e}`));

// Configurações do Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

// Configuração de Sessão
const sessionOptions = session({
  secret: sessionSecret,
  store: MongoStore.create({ mongoUrl: connectionString }),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true }
});
app.use(sessionOptions);
app.use(flash());

// Configurações de View Engine
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(csrf());
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

// Inicialização do Servidor
app.on('Ready', () => {
  app.listen(port, () => {
    console.log(`Servidor executando na porta ${port} - Acesse http://localhost:${port}`);
  });

});