const Contato = require('../models/ContatoModel');

exports.index = async (req, res) => {
  const contatos = await Contato.buscaContatos(req);
  res.render('index', { contatos });
};
