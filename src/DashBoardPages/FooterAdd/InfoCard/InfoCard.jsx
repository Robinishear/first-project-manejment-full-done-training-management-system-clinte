import React, { useEffect, useState } from "react";
import axios from "axios";

export default function InfoCard() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [items, setItems] = useState(["", "", ]);
  const [infoCards, setInfoCards] = useState([]);
  const [loading, setLoading] = useState(false);

  // Edit modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    title: "",
    image: "",
    imageFile: null,
    items: [],
  });
  const [editLoading, setEditLoading] = useState(false);

  const imgbbKey = "5175db627df59a16e4890e5f6958078a"; // replace with your key

  // Fetch InfoCards
  const fetchInfoCards = async () => {
    try {
      const res = await axios.get("http://localhost:5000/InfoCard");
      setInfoCards(res.data);
    } catch (err) {
      console.error("Error fetching InfoCards:", err);
      alert("Failed to fetch InfoCards");
    }
  };

  useEffect(() => {
    fetchInfoCards();
  }, []);

  // Upload image to Imgbb
  const uploadImage = async (file) => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("image", file);
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
      formData
    );
    return res.data.data.url;
  };

  // Add new InfoCard
  const handleAdd = async () => {
    if (!name || !title || !imageFile) {
      alert("Name, Title, and Image are required!");
      return;
    }
    setLoading(true);
    try {
      const imageUrl = await uploadImage(imageFile);
      await axios.post("http://localhost:5000/InfoCard", {
        name,
        title,
        image: imageUrl,
        items: items.filter((i) => i.trim() !== ""),
      });
      fetchInfoCards();
      // Reset form
      setName("");
      setTitle("");
      setImageFile(null);
      setItems(["", "", "", "", "", ""]);
    } catch (err) {
      console.error("Add failed:", err);
      alert("Failed to add InfoCard");
    } finally {
      setLoading(false);
    }
  };

  // Delete InfoCard
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this InfoCard?")) return;
    try {
      await axios.delete(`http://localhost:5000/InfoCard/${id}`);
      fetchInfoCards();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete InfoCard");
    }
  };

  // Open Edit Modal
  const handleEditOpen = (student) => {
    setEditStudent(student);
    setEditForm({
      name: student.name,
      title: student.title,
      image: student.image,
      imageFile: null,
      items: student.items || ["", "", "", "", "", ""],
    });
    setEditModalOpen(true);
  };

  // Close Edit Modal
  const handleEditClose = () => {
    setEditModalOpen(false);
    setEditStudent(null);
    setEditForm({ name: "", title: "", image: "", imageFile: null, items: [] });
  };

  // Handle Edit form changes
  const handleEditChange = (e, index = null) => {
    if (index !== null) {
      const newItems = [...editForm.items];
      newItems[index] = e.target.value;
      setEditForm({ ...editForm, items: newItems });
    } else if (e.target.name === "imageFile") {
      setEditForm({ ...editForm, imageFile: e.target.files[0] });
    } else {
      setEditForm({ ...editForm, [e.target.name]: e.target.value });
    }
  };

  // Update InfoCard
  const handleUpdate = async () => {
    if (!editStudent) return;
    setEditLoading(true);
    try {
      let imageUrl = editForm.image;
      if (editForm.imageFile) {
        imageUrl = await uploadImage(editForm.imageFile);
      }
      await axios.put(`http://localhost:5000/InfoCard/${editStudent._id}`, {
        name: editForm.name,
        title: editForm.title,
        image: imageUrl,
        items: editForm.items.filter((i) => i.trim() !== ""),
      });
      fetchInfoCards();
      handleEditClose();
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update InfoCard");
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto bg-gray-800 text-white rounded-2xl">
      <h2 className="text-xl font-bold mb-3">Add New InfoCard</h2>

      {/* Add Form */}
      <input
        type="text"
        placeholder="Name"
        className="border p-2 w-full mb-2 text-white bg-gray-700 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Title"
        className="border p-2 w-full mb-2 text-white bg-gray-700 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        className="border p-2 w-full mb-2 bg-gray-700 text-white rounded"
        onChange={(e) => setImageFile(e.target.files[0])}
      />

      <h3 className="font-semibold mb-2">Items</h3>
      {items.map((item, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Item ${i + 1}`}
          className="border p-2 w-full mb-2 text-white bg-gray-700 rounded"
          value={item}
          onChange={(e) => {
            const newItems = [...items];
            newItems[i] = e.target.value;
            setItems(newItems);
          }}
        />
      ))}

      <button
        onClick={handleAdd}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
      >
        {loading ? "Adding..." : "Add InfoCard"}
      </button>

      {/* List InfoCards */}
      <h2 className="text-xl font-bold mt-6">All InfoCards</h2>
      <ul>
        {infoCards.map((student) => (
          <li key={student._id} className="flex justify-between items-center border-b border-gray-600 py-2">
            <span>
              <b>{student.name}</b> - {student.title}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditOpen(student)}
                className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(student._id)}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl shadow-xl max-w-lg w-full p-6 relative">
            <button
              onClick={handleEditClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4 text-yellow-400">Edit InfoCard</h2>

            <label className="block text-gray-200 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={editForm.name}
              onChange={handleEditChange}
              className="w-full px-3 py-2 mb-3 rounded bg-gray-800 text-white border border-gray-700"
            />

            <label className="block text-gray-200 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={editForm.title}
              onChange={handleEditChange}
              className="w-full px-3 py-2 mb-3 rounded bg-gray-800 text-white border border-gray-700"
            />

            <label className="block text-gray-200 mb-1">Image URL / Change Image</label>
            <input
              type="text"
              name="image"
              value={editForm.image}
              onChange={handleEditChange}
              className="w-full px-3 py-2 mb-3 rounded bg-gray-800 text-white border border-gray-700"
            />
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={(e) => handleEditChange(e, "imageFile")}
              className="w-full px-3 py-2 mb-3 rounded bg-gray-800 text-white border border-gray-700"
            />

            <h3 className="font-semibold mb-1">Items</h3>
            {editForm.items.map((item, i) => (
              <input
                key={i}
                type="text"
                value={item}
                onChange={(e) => handleEditChange(e, i)}
                className="w-full px-3 py-2 mb-2 rounded bg-gray-800 text-white border border-gray-700"
              />
            ))}

            <button
              onClick={handleUpdate}
              disabled={editLoading}
              className={`px-6 py-2 rounded text-white ${editLoading ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-600"}`}
            >
              {editLoading ? "Updating..." : "Update InfoCard"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
