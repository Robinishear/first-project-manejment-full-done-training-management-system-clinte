import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminForm() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [items, setItems] = useState(["", "", "", "", ""]); // 5 item fields
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  // Update mode
  const [editId, setEditId] = useState(null);

  const fetchCards = () =>
    axios.get("http://localhost:5000/cards").then((res) => setCards(res.data));

  useEffect(() => {
    fetchCards();
  }, []);

  // update item input
  const handleItemChange = (index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  // Add / Update card
  const handleSave = async () => {
    if (!name || !title) {
      alert("Name & Title required!");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = null;

      // যদি নতুন image file থাকে, তাহলে upload করবে
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const imgbbKey = "864ced6637c33bde4c71585921a52efc"; 
        const imgbbRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
          formData
        );

        imageUrl = imgbbRes.data.data.url;
      }

      const payload = {
        name,
        title,
        items: items.filter((i) => i.trim() !== ""),
      };

      if (imageUrl) payload.image = imageUrl;

      if (editId) {
        // 🔹 Update card
        await axios.put(`http://localhost:5000/cards/${editId}`, payload);
        alert("Card updated successfully!");
      } else {
        // 🔹 Add new card
        await axios.post("http://localhost:5000/cards", payload);
        alert("Card added successfully!");
      }

      fetchCards();
      handleReset();
    } catch (err) {
      console.error(err);
      alert("Something went wrong while saving card.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/cards/${id}`);
    fetchCards();
  };

  const handleEdit = (card) => {
    setEditId(card._id);
    setName(card.name);
    setTitle(card.title);
    setItems([
      card.items[0] || "",
      card.items[1] || "",
      card.items[2] || "",
      card.items[3] || "",
      card.items[4] || "",
    ]);
    setImageFile(null);
  };

  const handleReset = () => {
    setEditId(null);
    setName("");
    setTitle("");
    setImageFile(null);
    setItems(["", "", "", "", ""]);
  };

  return (
    <div className="p-4 max-w-5xl rounded-2xl mx-auto bg-gray-800 text-white">
      <h2 className="text-lg font-bold mb-3">
        {editId ? "Edit Card" : "Add New Card"}
      </h2>

      {/* Name */}
      <input
        type="text"
        placeholder="Name"
        className="border p-2 w-full mb-2 text-black"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Title */}
      <input
        type="text"
        placeholder="Title"
        className="border p-2 w-full mb-2 text-black"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Image */}
      <input
        type="file"
        className="border p-2 w-full mb-2"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
      />

      {/* Items (5 inputs) */}
      <h3 className="font-semibold mb-2">Items</h3>
      {items.map((item, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Item ${index + 1}`}
          className="border p-2 w-full mb-2 text-black"
          value={item}
          onChange={(e) => handleItemChange(index, e.target.value)}
        />
      ))}

      {/* Add / Update button */}
      <button
        onClick={handleSave}
        disabled={loading}
        className={`px-4 py-2 rounded text-white mr-2 ${
          loading ? "bg-gray-400" : "bg-green-600"
        }`}
      >
        {loading ? "Saving..." : editId ? "Update" : "Add"}
      </button>

      {editId && (
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded bg-yellow-600 text-white"
        >
          Cancel
        </button>
      )}

      {/* Show cards */}
      <h2 className="text-lg font-bold mt-6">All Cards</h2>
      <ul>
        {cards.map((c) => (
          <li
            key={c._id}
            className="flex justify-between items-center border-b py-2"
          >
            <span>
              <b>{c.name}</b> - {c.title}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(c)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(c._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
