import { useState, useEffect } from "react";

export default function App() {
  const [gifts, setGifts] = useState([]);

  // Buscar produtos do backend
  const buscarProdutos = async () => {
    const resposta = await fetch("http://localhost:5000/api/produtos");
    const dados = await resposta.json();
    setGifts(dados);
  };

  // Atualizar quantidade no backend
  const adicionarPresente = async (id) => {
    const gift = gifts.find((g) => g.id === id);
    if (gift.quantidade_atual < gift.quantidade_maxima) {
      const novaQuantidade = gift.quantidade_atual + 1;

      // Requisição para atualizar no backend
      await fetch(`http://localhost:5000/api/produtos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantidade_atual: novaQuantidade }),
      });

      // Atualiza o estado local
      const novoGifts = gifts.map((g) =>
        g.id === id
          ? { ...g, quantidade_atual: novaQuantidade }
          : g
      );
      setGifts(novoGifts);
    }
  };

  // Carregar produtos ao carregar o componente
  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Lista de Presentes</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <ul>
          {gifts.map((gift) => (
            <li
              key={gift.id}
              className={`flex justify-between items-center p-3 rounded-md cursor-pointer transition ${
                gift.quantidade_atual === gift.quantidade_maxima
                  ? "bg-green-100"
                  : "bg-gray-50"
              } hover:bg-gray-200`}
              onClick={() => adicionarPresente(gift.id)}
            >
              <span className="text-lg font-medium text-gray-700">
                {gift.nome} - ({gift.quantidade_atual}/{gift.quantidade_maxima})
              </span>
              {gift.quantidade_atual === gift.quantidade_maxima && (
                <span className="text-green-600 font-bold">✓</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
