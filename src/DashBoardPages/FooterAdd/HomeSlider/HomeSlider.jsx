import React, { useState, useEffect } from "react";
import axios from "axios";

export default function HomeSlider() {
  const [image, setImage] = useState(null);
  const [banners, setBanners] = useState([]);

  const fetchBanners = async () => {
    const res = await axios.get("http://localhost:5000/homeSlider");
    setBanners(res.data);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleAdd = async () => {
    if (!image) {
      alert("একটা ইমেজ সিলেক্ট করুন!");
      return;
    }

    // 🔹 Image upload to imgbb
    const formData = new FormData();
    formData.append("image", image);

    try {
      const uploadRes = await axios.post(
        "https://api.imgbb.com/1/upload?key=5175db627df59a16e4890e5f6958078a",
        formData
      );

      const imageUrl = uploadRes.data.data.url;

      // 🔹 Save image URL to MongoDB
      await axios.post("http://localhost:5000/homeSlider", {
        src: imageUrl,
      });

      setImage(null);
      fetchBanners();
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Image upload failed!");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/homeSlider/${id}`);
    fetchBanners();
  };

  return (
    <div className="p-4 max-w-3xl mx-auto bg-gray-800 text-white rounded-xl">
      <h2 className="text-xl font-bold mb-4">🖼️ Add Image</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="border p-2 w-full mb-2 text-black bg-white"
      />

      <button
        onClick={handleAdd}
        className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
      >
        Upload Image
      </button>

      <h3 className="text-lg mt-6">📋 All Images</h3>
      <ul>
        {banners.map((b) => (
          <li
            key={b._id}
            className="flex justify-between items-center py-2 border-b border-gray-600"
          >
            <img src={b.src} alt="banner" className="w-24 h-16 object-cover rounded" />
            <button
              onClick={() => handleDelete(b._id)}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
