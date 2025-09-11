import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardPage() {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;

  useEffect(() => {
    axios.get("http://localhost:5000/cards").then((res) => setCards(res.data));
  }, []);

  const handleOpenModal = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
    setIsModalOpen(false);
  };

  // pagination logic
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(cards.length / cardsPerPage);

  return (
    <div className="bg-gray-800 py-6 rounded-2xl">
      <div className="flex items-center justify-center text-2xl font-bold text-gray-400 py-7">
        খবর: ২০২৫-২৬ শিক্ষাবর্ষে ডিপ্লোমা পর্যায়ে ভর্তি পরীক্ষা (২০২৫-০৭-২৭)
      </div>
      <div className="flex ">
        <div className="flex-1 p-4 md:p-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 max-w-7xl mx-auto">
          {currentCards.map((card) => (
            <div
              key={card._id}
              className="border rounded bg-gray-800 border-slate-700 p-2 shadow-sm"
            >
              <h2 className="font-semibold text-lg mb-2">{card.title}</h2>
              <div className="flex flex-col items-center">
                <p className="mb-2 font-medium">{card.name}</p>
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
              <button
                onClick={() => handleOpenModal(card)}
                className="mt-3 px-3 py-1 rounded bg-blue-600 text-white text-sm w-full"
              >
                Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-gray-200">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && selectedCard && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-md shadow-xl max-w-2xl w-full p-6 relative max-h-[80vh] overflow-y-auto border border-indigo-500">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-3">{selectedCard.title}</h2>
            <img
              src={selectedCard.image}
              alt={selectedCard.title}
              className="w-full h-60 object-cover rounded-lg"
            />
            <h3 className="font-semibold text-white">Name:</h3>
            <p className="mb-2">{selectedCard.name || "N/A"}</p>

            <h3 className="font-semibold text-white">Items:</h3>
            <ul className="list-disc list-inside text-white text-sm leading-tight">
              {selectedCard.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
