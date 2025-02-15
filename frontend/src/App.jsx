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
        g.id === id ? { ...g, quantidade_atual: novaQuantidade } : g
      );
      setGifts(novoGifts);
    }
  };

  // Carregar produtos ao carregar o componente
  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-green-700 mb-6">
        Lista de Presentes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {gifts.map((gift) => (
          <div
            key={gift.id}
            className={`p-4 rounded-lg shadow-lg transition transform hover:scale-105 cursor-pointer text-center border-2 
              ${
                gift.quantidade_atual === gift.quantidade_maxima
                  ? "bg-green-200 border-green-500"
                  : "bg-white border-gray-300"
              }`}
          >
            <h2 className="text-xl font-semibold text-gray-800 mt-2">
              {gift.nome}
            </h2>
            <p className="text-gray-600">
              ({gift.quantidade_atual}/{gift.quantidade_maxima})
            </p>
            <img
              src={gift.imagem}
              alt={gift.nome}
              className="w-48 h-48 mx-auto mt-4 mb-4"
            ></img>
            <a
              href={gift.link}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline block font-semibold border-2 border-blue-500 p-1 rounded-lg"
            >
              Compre aqui
            </a>
            <p
              className="text-green-500 font-bold border-2 border-green-500 m-2 hover:bg-green-500 hover:text-white py-1 px-2 rounded-lg cursor-pointer"
              onClick={() => adicionarPresente(gift.id)}
            >
              Marcar como comprado
            </p>
            {gift.quantidade_atual === gift.quantidade_maxima && (
              <p className="text-green-600 font-bold mt-2">✓ Completo</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
