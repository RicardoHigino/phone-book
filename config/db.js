const mongoose = require('mongoose');
const connectionString = process.env.DB_CONNECTION_STRING;

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      useFindAndModify: false 
    });
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (e) {
    console.error(`Erro ao conectar no banco de dados: ${e}`);
    process.exit(1);
  }
};

module.exports = connectDB;
