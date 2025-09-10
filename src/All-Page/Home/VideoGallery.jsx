// VideoGallery.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/videos").then((res) => setVideos(res.data));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">
        🎥 Success Students Videos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((v) => (
          <div
            key={v._id}
            className="bg-gray-800 p-3 rounded-lg shadow-md border border-gray-700"
          >
            <h3 className="text-lg font-semibold mb-2 text-white">{v.title}</h3>
            <iframe
              src={v.videoUrl}
              title={v.title}
              className="w-full h-60 rounded-lg"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}
