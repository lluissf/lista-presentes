# 🎁 Sistema de Presentes

Este é um sistema de gerenciamento de presentes desenvolvido com **React** (frontend) e **Node.js + Express** (backend). O objetivo é permitir que todos os usuários vejam e atualizem as quantidades de presentes disponíveis em tempo real, utilizando um arquivo JSON armazenado no servidor.

---

## 📂 Estrutura do Projeto
```
meu-projeto/
│   ├── backend/
│   │   ├── server.js      # Backend com Node.js e Express
│   │   └── produtos.json  # JSON que será atualizado
│   └── frontend/
│       └── src/
│           └── App.jsx    # React que consome a API
```

---

## 🚀 Funcionalidades
- Visualizar a lista de presentes com quantidades atuais e máximas.
- Adicionar presentes, atualizando o JSON no servidor.
- Compartilhar as alterações com todos os usuários em tempo real.

---

## ⚙️ Instalação
### 1. Backend
```bash
cd backend
npm install
node server.js
```
O servidor estará rodando em: `http://localhost:5000`

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
O React estará disponível em: `http://localhost:5173`

---

## 🔗 Endpoints
- `GET /api/produtos`: Lista todos os produtos.
- `PUT /api/produtos/:id`: Atualiza a quantidade de um produto.

---

## 📜 Licença
Este projeto é licenciado sob a [MIT License](./LICENSE).

---

## ✨ Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e enviar pull requests.
