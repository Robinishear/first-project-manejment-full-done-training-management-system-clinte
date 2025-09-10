import React, { useState, useEffect } from "react";

export default function EditStudentModal({
  isOpen,
  onClose,
  studentData,
  onSave,
}) {
  const [editedData, setEditedData] = useState(studentData);

  useEffect(() => {
    setEditedData(studentData);
  }, [studentData]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedData);
  };

  //  Define keys to exclude from the form
  const excludedKeys = ["_id", "branchId"];

  //  Filter the keys to be displayed
  const displayKeys = Object.keys(editedData).filter(
    (key) => !excludedKeys.includes(key)
  );

  return (
    <div className="fixed inset-0 bg-gray-950 bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 text-gray-100 rounded-lg shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-indigo-400 mb-6 text-center">
          Edit Student Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/*  Map over the filtered displayKeys */}
          {displayKeys.map((key) => (
            <div key={key}>
              <label
                htmlFor={key}
                className="block text-gray-300 capitalize text-sm mb-1"
              >
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <input
                type="text"
                name={key}
                id={key}
                value={editedData[key]}
                onChange={handleChange}
                className="w-full rounded-md bg-gray-900 text-gray-100 border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
