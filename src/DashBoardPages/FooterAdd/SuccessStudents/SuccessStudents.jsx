import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SuccessStudents() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [items, setItems] = useState(["", "",]);
  const [successStudents, setSuccessStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal for editing
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", title: "", image: "", items: [] });

  // Fetch students
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

  // Add student
  const handleAdd = async () => {
    if (!name || !title || !imageFile) {
      alert("Name, Title, and Image are required!");
      return;
    }
    setLoading(true);
    try {
      // Upload image to imgbb
      const formData = new FormData();
      formData.append("image", imageFile);
      const imgbbKey = "5175db627df59a16e4890e5f6958078a";
      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        formData
      );
      const imageUrl = imgbbRes.data.data.url;

      // Save to backend
      await axios.post("http://localhost:5000/successStudents", {
        name,
        title,
        image: imageUrl,
        items: items.filter((i) => i.trim() !== ""),
      });

      fetchSuccessStudents();
      setName("");
      setTitle("");
      setImageFile(null);
      setItems(["", ""]);
    } catch (err) {
      console.error(err);
      alert("Error adding student.");
    } finally {
      setLoading(false);
    }
  };

  // Delete student
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/successStudents/${id}`);
      fetchSuccessStudents();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Open Edit Modal
  const handleEditOpen = (student) => {
    setEditStudent(student);
    setEditForm({
      name: student.name,
      title: student.title,
      image: student.image,
      items: student.items || [],
    });
    setEditModalOpen(true);
  };

  // Close Edit Modal
  const handleEditClose = () => {
    setEditModalOpen(false);
    setEditStudent(null);
  };

  // Update form change
  const handleEditChange = (e, index = null) => {
    if (index !== null) {
      const newItems = [...editForm.items];
      newItems[index] = e.target.value;
      setEditForm({ ...editForm, items: newItems });
    } else {
      setEditForm({ ...editForm, [e.target.name]: e.target.value });
    }
  };

  // Update student
  const handleUpdate = async () => {
    if (!editStudent) return;
    try {
      await axios.put(`http://localhost:5000/successStudents/${editStudent._id}`, editForm);
      fetchSuccessStudents();
      handleEditClose();
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed!");
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto bg-gray-800 text-white rounded-2xl">
      <h2 className="text-xl font-bold mb-3">Add New Student</h2>

      {/* Add Form */}
      <input
        type="text"
        placeholder="Name"
        className="border p-2 w-full mb-2 text-white"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Title"
        className="border p-2 w-full mb-2 text-white"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        className="border p-2 w-full mb-2 bg-gray-700 text-white"
        onChange={(e) => setImageFile(e.target.files[0])}
      />
      <h3 className="font-semibold mb-2">Items</h3>
      {items.map((item, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Item ${i + 1}`}
          className="border p-2 w-full mb-2 text-white"
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
        {loading ? "Adding..." : "Add"}
      </button>

      {/* Student List */}
      <h2 className="text-xl font-bold mt-6">All Students</h2>
      <ul>
        {successStudents.map((student) => (
          <li key={student._id} className="flex justify-between items-center border-b border-gray-600 py-2">
            <span>
              <b>{student.name}</b> - {student.title}
            </span>
            <div className="flex gap-2">
              <button onClick={() => handleEditOpen(student)} className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600">
                Edit
              </button>
              <button onClick={() => handleDelete(student._id)} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
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
            <button onClick={handleEditClose} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl">
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4 text-yellow-400">Edit Student</h2>

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

            <label className="block text-gray-200 mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              value={editForm.image}
              onChange={handleEditChange}
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

            <button onClick={handleUpdate} className="px-6 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600">
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
