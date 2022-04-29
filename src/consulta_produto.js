const db = require("./db.js");

const consultaFull = async () => {
  const produto = await db.produto.findAll();
  return produto;
};

const criarProduto = async (codigo, descricao, preco) => {
 

  let consultaProdutoExistente = await getProduto(codigo);

  if (consultaProdutoExistente == null) {
    const novoProduto = {
      Codigo: codigo,
      Descricao: descricao,
      Preco: preco,
    };
    await db.produto.create(novoProduto);

    return {
      codigo: codigo,
      descricao: descricao,
      preco: preco,
    };
  } else {
    const valores = await atualizar(codigo, descricao, preco);

    return valores;
  }


};

const atualizar = async (codigo, descricao, preco) => {
  try {
    let consultaProdutoExistente = await db.produto.findOne({
      where: { Codigo : codigo }
    })
    if (consultaProdutoExistente == null) {
      throw new Error(
        `Codigo do produto não encontrado ${consultaProdutoExistente}`
      );
    }
    const atualizarProduto = {
      Codigo: codigo,
      Descricao: descricao,
      Preco: preco,
    };

    await db.produto.update(atualizarProduto, {
      where: {
        Codigo: atualizarProduto.Codigo,
      },
    });
    return await getProduto(atualizarProduto.Codigo);
  } catch (error) {
    throw error;
  }
};

const getProduto = async (Codigo) => {
  return await db.produto.findOne({
    where: { Codigo },
  });
};

const deletarProduto = async (Codigo) => {
  try {
    produto = await getProduto(Codigo);
    if (produto == null) {
      throw new Error(`Codigo do produto não encontrado ${produto}`);
    }
    await db.produto.destroy({
      where: { Codigo },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  criarProduto,
  consultaFull,
  atualizar,
  getProduto,
  deletarProduto,
};
