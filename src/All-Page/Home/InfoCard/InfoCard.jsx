import React, { useEffect, useState } from "react";
import axios from "axios";

export default function InfoCard() {
  const [infoCards, setInfoCards] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 3;

  useEffect(() => {
    axios
      .get("http://localhost:5000/InfoCard") 
      .then((res) => setInfoCards(res.data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  const handleOpenModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };

  // pagination logic
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = infoCards.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(infoCards.length / studentsPerPage);

  return (
    <div className="mt-10 py-5 rounded-2xl ">
      <div className="flex items-center justify-center py-6 text-3xl font-bold text-cyan-700">
      চেয়ারম্যানের কথা
      </div>

      <div className="flex">
        <div className="flex-1 p-4 md:p-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-7xl mx-auto">
          {currentStudents.map((student) => (
            <div
              key={student._id}
              className="border rounded bg-gray-800 border-slate-700 p-2 shadow-sm"
            >
              <h2 className="font-semibold text-lg mb-2">{student.title}</h2>
              <div className="flex flex-col items-center">
                <p className="mb-2 font-medium">{student.name}</p>
                <img
                  src={student.image}
                  alt={student.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
              <button
                onClick={() => handleOpenModal(student)}
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
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-md shadow-xl max-w-2xl w-full p-6 relative max-h-[80vh] overflow-y-auto border border-indigo-500">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-3">{selectedStudent.title}</h2>
            <img
              src={selectedStudent.image}
              alt={selectedStudent.title}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />

            <h3 className="font-semibold text-white">Name:</h3>
            <p className="mb-2">{selectedStudent.name || "N/A"}</p>

            <h3 className="font-semibold text-white">Items:</h3>
            <ul className="list-disc list-inside text-white text-sm leading-tight">
              {selectedStudent.items && selectedStudent.items.length > 0 ? (
                selectedStudent.items.map((item, i) => <li key={i}>{item}</li>)
              ) : (
                <li>N/A</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
