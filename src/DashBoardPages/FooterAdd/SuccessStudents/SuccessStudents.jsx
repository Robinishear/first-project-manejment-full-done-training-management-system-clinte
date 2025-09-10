import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SuccessStudents() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [items, setItems] = useState(["", "", "","", "", ""]);
  const [successStudents, setSuccessStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuccessStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/successStudents");
      setSuccessStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  useEffect(() => {
    fetchSuccessStudents();
  }, []);

  // update item input
  const handleItemChange = (index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  const handleAdd = async () => {
    if (!name || !title || !imageFile) {
      alert("Name, Title, and Image are required!");
      return;
    }

    setLoading(true);

    try {
      // 1️ Upload image to imgbb
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgbbKey = "864ced6637c33bde4c71585921a52efc";
      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        formData
      );

      const imageUrl = imgbbRes.data.data.url;

      // 2️⃣ Save card to backend
      await axios.post("http://localhost:5000/successStudents", {
        name,
        title,
        image: imageUrl,
        items: items.filter((i) => i.trim() !== ""),
      });

      fetchSuccessStudents();

      // reset
      setName("");
      setTitle("");
      setImageFile(null);
      setItems(["", "", "", "", ""]);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while uploading image or saving card.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/successStudents/${id}`);
      fetchSuccessStudents();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="p-4 max-w-5xl rounded-2xl mx-auto bg-gray-800 text-white">
      <h2 className="text-lg font-bold mb-3">Add New Student</h2>

      {/* Name */}
      <input
        type="text"
        placeholder="Name"
        className="border p-2 w-full mb-2 text-white"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Title */}
      <input
        type="text"
        placeholder="Title"
        className="border p-2 w-full mb-2 text-white"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Image */}
      <input
        type="file"
        className="border p-2 w-full mb-2 bg-gray-700 text-white"
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
          className="border p-2 w-full mb-2 text-white"
          value={item}
          onChange={(e) => handleItemChange(index, e.target.value)}
        />
      ))}

      {/* Add button */}
      <button
        onClick={handleAdd}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Adding..." : "Add"}
      </button>

      {/* Show successStudents */}
      <h2 className="text-lg font-bold mt-6">All Success Students</h2>
      <ul>
        {successStudents.map((c) => (
          <li
            key={c._id}
            className="flex justify-between items-center border-b border-gray-600 py-2"
          >
            <span>
              <b>{c.name}</b> - {c.title}
            </span>
            <button
              onClick={() => handleDelete(c._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
