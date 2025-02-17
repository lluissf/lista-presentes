const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json()); 
app.use(cors({
  origin: 'https://lista-presentes-dusky.vercel.app'  // Altere para a URL final do frontend
}));

const filePath = "./assets/produtos.json";
app.get('/', (req, res) => {
  res.send('Servidor funcionando! 🚀');
});

// Rota para obter os produtos
app.get("/api/produtos", (req, res) => {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao ler o arquivo JSON." });
    }
    res.json(JSON.parse(data));
  });
});

// Rota para atualizar um produto
app.put("/api/produtos/:id", (req, res) => {
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
          return res
            .status(500)
            .json({ error: "Erro ao salvar o arquivo JSON." });
        }
        res.json({ success: true, produto });
      });
    } else {
      res.status(404).json({ error: "Produto não encontrado." });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em  ${PORT}`);
});

