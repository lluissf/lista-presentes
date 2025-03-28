import { useState, useEffect } from "react";
import { localhost, dominio_localhost_backend, dominio_producao_backend } from "../../backend/config.json";
import { FaWhatsapp, FaCartArrowDown, FaInstagram, FaGithub } from "react-icons/fa";
// Alteração para rodar a instância.
export default function App() {
  const [gifts, setGifts] = useState([]);
  const api = localhost
    ? dominio_localhost_backend
    : dominio_producao_backend;
  // Buscar produtos do backend
  const buscarProdutos = async () => {
    const resposta = await fetch(api + "/api/produtos");
    const dados = await resposta.json();

    // Garantir que todos os itens tenham um campo `links` definido como array
    const dadosComLinks = dados.map((item) => ({
      ...item,
      links: item.links || [], // Define como array vazio se `links` for undefined
    }));

    setGifts(dadosComLinks);
  };
  const enviarMensagemWhatsapp = (produto) => {
    const numero = "5547996837826";
    const mensagem = `Olá! Gostaria de comprar o presente "${
      produto.nome
    }" para o enxoval. Poderia me enviar mais informações?\n\nLink do presente: ${produto.link.join(
      "\n "
    )}`;
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`);
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
        Bem vindo à Lista de Sugestões de Presentes
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
                  ? "bg-green-200 border-green-500 "
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
            {gift.link.length > 1 ? (
              <button
                onClick={() => enviarMensagemWhatsapp(gift)}
                className="flex items-center justify-center gap-2 text-blue-500 font-bold border-2 border-blue-500 m-2 hover:bg-blue-500 hover:text-white py-1 px-2 rounded-lg cursor-pointer w-full"
              >
                Pedir pelo WhatsApp <FaWhatsapp />
              </button>
            ) : (
              <button
                onClick={() => abrirSites(gift.link)}
                className="flex items-center justify-center gap-2 text-blue-500 font-bold border-2 border-blue-500 m-2 hover:bg-blue-500 hover:text-white py-1 px-2 rounded-lg cursor-pointer w-full"
              >
                Compre aqui <FaCartArrowDown />
              </button>
            )}
            <button
              className={`text-green-500 font-bold border-2 border-green-500 m-2  py-1 px-2 rounded-lg cursor-pointer w-full ${
                gift.quantidade_atual === gift.quantidade_maxima
                  ? "bg-gray-300 cursor-not-allowed"
                  : "hover:bg-green-500 hover:text-white"
              }`}
              onClick={() => adicionarPresente(gift.id)}
              disabled={gift.quantidade_atual === gift.quantidade_maxima}
            >
              {gift.quantidade_atual === gift.quantidade_maxima
                ? "Comprado ✓"
                : "Marcar como comprado"}
            </button>
          </div>
        ))}
      </div>
      <footer className="bg-black text-white text-sm py-2 w-full fixed bottom-0">
  <div className="max-w-6xl mx-auto px-4 flex justify-center items-center">
    <span>Desenvolvido por: </span>
    <a
      href="https://www.github.com/henrique-furtado47"
      className="text-blue-500 hover:underline mx-2 flex items-center gap-1"
    >
      Henrique Furtado  <FaGithub />
    </a>
    <span>e</span>
    <a
      onClick={() =>
        abrirSites([
          "https://www.github.com/lluissf",
          "https://www.instagram.com/_.luissf/",
        ])
      }
      className="text-blue-500 hover:text-white transition-all  mx-2 flex items-center gap-1"
    >
      Luis Felipe <FaGithub /> <FaInstagram />
    </a>
  </div>
</footer>

    </div>
  );
}
