const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "db",
  port: 5432,
  database: "db_desafio04",
  username: "postgres",
  password: "mysecretpassword",
  logging: false,
});



const produtoModel = (sequelize, DataTypes) => {
  const Produto = sequelize.define("Produto", {
    Codigo: {
      type: DataTypes.STRING,
      allowNull: false.valueOf,
      primaryKey: true,
      unique: true,
    },
    Descricao: {
      type: DataTypes.STRING,
      allowNull: false.valueOf,
      unique: true,
    },
    Preco: {
      type: DataTypes.DOUBLE,
      allowNull: false.valueOf,
      unique: true,
    },
  });

  return Produto;
};

const produto = produtoModel(sequelize, Sequelize.DataTypes);

module.exports = {
  produto,
  sequelize,
};
