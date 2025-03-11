const express = require("express");
const cors = require("cors");
const produtosRoutes = require("./routes/produtos");
const app = express();
const {
  localhost,
  dominio_localhost_frontend,
  dominio_producao_frontend,
} = require("./config.json");

const url = localhost ? dominio_localhost_frontend : dominio_producao_frontend;
app.use(
  cors({
    origin: url,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor funcionando! 🚀");
});

app.use("/api/produtos", produtosRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em ${PORT}`);
});
