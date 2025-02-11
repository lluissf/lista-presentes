import { useState } from "react";
import giftsData from "./assets/produtos.json";

export default function App() {
  const [gifts, setGifts] = useState(giftsData);

  const adicionarPresente = (id) => {
    const novoGifts = gifts.map((gift) => {
      if (gift.id === id && gift.quantidade_atual < gift.quantidade_maxima) {
        return { ...gift, quantidade_atual: gift.quantidade_atual + 1 };
      }
      return gift;
    });
    setGifts(novoGifts);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Lista de Presentes</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <ul>
          {gifts.map((gift) => (
            <li
              key={gift.id}
              className={`flex justify-between items-center p-3 rounded-md cursor-pointer transition ${
                gift.quantidade_atual === gift.quantidade_maxima ? "bg-green-100" : "bg-gray-50"
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
