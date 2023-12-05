import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Importações de módulos
import Login from './modules/Login';
import Contato from './modules/Contato';

// Inicialização dos módulos de Login
const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');
login.init();
cadastro.init();

// Inicialização do módulo de Contato
const contato = new Contato('.form-contato');
contato.init();
