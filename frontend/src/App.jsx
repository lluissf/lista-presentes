import { useState, useEffect } from "react";

export default function App() {
  const [gifts, setGifts] = useState([]);
  const api = "https://lista-presentes-production.up.railway.app/"
  // Buscar produtos do backend
  const buscarProdutos = async () => {
    const resposta = await fetch(api+"api/produtos");
    const dados = await resposta.json();

    // Garantir que todos os itens tenham um campo `links` definido como array
    const dadosComLinks = dados.map((item) => ({
      ...item,
      links: item.links || [], // Define como array vazio se `links` for undefined
    }));

    setGifts(dadosComLinks);
  };

  // Função para abrir múltiplos sites
  const abrirSites = (urls) => {
    if (Array.isArray(urls)) {
      urls.forEach((url) => {
        window.open(url, "_blank");
      });
    } else {
      console.error("O campo 'links' não é um array válido:", urls);
    }
  };
  const adicionarPresente = async (id) => {
    const gift = gifts.find((g) => g.id === id);
    if (gift.quantidade_atual < gift.quantidade_maxima) {
      const novaQuantidade = gift.quantidade_atual + 1;
  
      try {
        const response = await fetch(`${api}/api/produtos/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantidade_atual: novaQuantidade }),
        });
  
        if (!response.ok) {
          throw new Error("Erro ao atualizar quantidade");
        }
  
        // Atualiza o estado local
        const novoGifts = gifts.map((g) =>
          g.id === id ? { ...g, quantidade_atual: novaQuantidade } : g
        );
        setGifts(novoGifts);
      } catch (error) {
        console.error(error);
      }
    }
  };
  
   

  // Carregar produtos ao carregar o componente
  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-green-700 mb-6 text-center bg-white">
        Bem vindo à Lista de Presentes para o chá de
      </h1>
      <h1 className="text-5xl font-bold text-green-700 mb-6 bg-white">
        Letícia e Luian
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        {" "}
        Marque os presentes que você comprou clicando no botão abaixo de cada
        presente.{" "}
      </p>
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
              className="w-48 h-48 object-cover mx-auto mt-4 mb-4"
            />
            <button
              onClick={() => abrirSites(gift.link)}
              className="text-blue-500 font-bold border-2 border-blue-500 m-2 hover:bg-blue-500 hover:text-white py-1 px-2 rounded-lg cursor-pointer w-full"
            >
              Compre aqui
            </button>
            <button
              className="text-green-500 font-bold border-2 border-green-500 m-2 hover:bg-green-500 hover:text-white py-1 px-2 rounded-lg cursor-pointer w-full"
              onClick={() => adicionarPresente(gift.id)}
            >
              Marcar como comprado
            </button>
            {gift.quantidade_atual === gift.quantidade_maxima && (
              <p className="text-green-600 font-bold mt-2">✓ Completo</p>
            )}
          </div>
        ))}
      </div>
      <footer className="mt-6 text-white text-center bg-black p-1 w-full fixed bottom-0">
        Desenvolvido por:{" "}
        <a
          href="https://www.github.com/henrique-furtado47"
          className="text-blue-500 hover:underline mr-2"
        >
          Henrique Furtado
        </a>
        {""}e{" "}
        <a
          href="https://www.github.com/lluissf"
          className="text-blue-500 hover:underline"
        >
          Luis Felipe
        </a>
      </footer>
    </div>
  );
}
