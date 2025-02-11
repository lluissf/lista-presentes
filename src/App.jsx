import { useState } from "react";

const gifts = [
  { id: 1, name: "Relógio Inteligente" },
  { id: 2, name: "Fone de Ouvido Bluetooth" },
  { id: 3, name: "Livro: Clean Code" },
  { id: 4, name: "Camiseta Personalizada" },
  { id: 5, name: "Caneca Térmica" },
];

export default function App() {
  const [selectedGifts, setSelectedGifts] = useState([]);

  const toggleGift = (id) => {
    setSelectedGifts((prev) =>
      prev.includes(id) ? prev.filter((giftId) => giftId !== id) : [...prev, id]
    );
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
                selectedGifts.includes(gift.id) ? "bg-green-100" : "bg-gray-50"
              } hover:bg-gray-200`}
              onClick={() => toggleGift(gift.id)}
            >
              <span className="text-lg font-medium text-gray-700">{gift.name}</span>
              {selectedGifts.includes(gift.id) && (
                <span className="text-green-600 font-bold">✓</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
