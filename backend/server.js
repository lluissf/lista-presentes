const express = require("express");
const cors = require("cors");
const produtosRoutes = require("./routes/produtos");
const app = express();
const { localhost } = require("./config.json");
const url = localhost
  ? "http://localhost:5173"
  : "https://lista-presentes-dusky.vercel.app";
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
