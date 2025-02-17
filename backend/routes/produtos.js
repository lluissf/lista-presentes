const express = require("express");
const fs = require("fs");
const router = express.Router();

const filePath = "../assets/produtos.json";

router.get("/", (req, res) => {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao ler o arquivo JSON." });
    }
    res.json(JSON.parse(data));
  });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { quantidade_atual } = req.body;

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao ler o arquivo JSON." });
    }

    const produtos = JSON.parse(data);
    const produto = produtos.find((p) => p.id === id);

    if (produto) {
      produto.quantidade_atual = quantidade_atual;

      fs.writeFile(filePath, JSON.stringify(produtos, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ error: "Erro ao salvar o arquivo JSON." });
        }
        res.json({ success: true, produto });
      });
    } else {
      res.status(404).json({ error: "Produto não encontrado." });
    }
  });
});

module.exports = router;
