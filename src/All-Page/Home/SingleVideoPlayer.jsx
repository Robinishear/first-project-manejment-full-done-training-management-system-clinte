// InlineAudioPlayer.jsx
import React from "react";

export default function InlineAudioPlayer() {
  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg text-white mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Featured Audio</h2>

      {/* YouTube Embed as Audio Only */}
      <div className="relative w-full overflow-hidden rounded-lg" style={{ height: "80px" }}>
        <iframe
          className="absolute top-[-150px] left-0 w-full"
          src="https://www.youtube.com/embed/_r58G5iM_NU?rel=0&controls=1"
          title="Featured Audio"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ height: "300px" }}
        ></iframe>
      </div>
    </div>
  );
}
