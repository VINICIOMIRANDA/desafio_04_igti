const express = require("express");
const app = express();
const { check, validationResult } = require("express-validator");

const consultaProduto = require("./consulta_produto.js");
app.use(express.json());

app.get("/", async (req, res) => {
  res
    .status(200)
    .send("Desafio 04 Bootcamp desenvolvedor back end - Tópicos especiais!");
});

app.get("/produto", async (req, res) => {
  try {
    const valores = await consultaProduto.consultaFull();
    res.status(200).json(valores);
  } catch (error) {
    return res.status(405).json({ error: error.message });
  }
});

app.post(
  "/produto",
  check("descricao", "Descricao deve ser informado").notEmpty(),
  check("preco", "O preco deve ser um número").notEmpty().isFloat(),

  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erro: erros.array() });
    }

    try {
      const valores = await consultaProduto.criarProduto(
        req.body.codigo,
        req.body.descricao,
        req.body.preco
      );
      res.status(201).json(valores);
    } catch (erro) {
      return res.status(405).json({ erro: erro.message });
    }
  }
);

app.put("/produto",
  check("codigo", "O código deve ser informado").notEmpty(),
  check("descricao", "Descricao deve ser informado").notEmpty(),
  check("preco", "O preco deve ser um número").notEmpty(),

  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erro: erros.array() });
    }

    try {
      const valores = await consultaProduto.atualizar(
        req.body.codigo,
        req.body.descricao,
        req.body.preco
      );
      res.status(200).json(valores);
    } catch (erro) {
      return res.status(405).json({ erro: erro.message });
    }
  }
)

app.get("/produto/:id", async (req, res) => {
  try {
    const valores = await consultaProduto.getProduto(req.params.id);
    res.status(200).json(valores);
  } catch (error) {
    return res.status(405).json({ error: error.message });
  }
});

app.delete("/produto/:id", async (req, res) => {
try {
  await consultaProduto.deletarProduto(req.params.id);
  res.end()

} catch (error) {
  return res.status(405).json({ error: error.message });
}

});


module.exports = app;
