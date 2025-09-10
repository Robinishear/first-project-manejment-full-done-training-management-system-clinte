// InlineAudioPlayer.jsx
import React from "react";

export default function InlineAudioPlayer() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900">
      {/* Card container */}
      <div className="flex flex-col md:flex-row text-white rounded-2xl overflow-hidden max-w-7xl w-full shadow-lg">
        
        {/* Video Section Full Screen */}
        <div className="md:w-1/3 flex-shrink-0 relative h-[500px] md:h-auto">
          <iframe
            className="w-full h-full object-cover"
            src="https://www.youtube.com/embed/_r58G5iM_NU?rel=0&controls=1"
            title="Featured Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Rules & Guidelines Section */}
        <div className="md:w-2/3 p-6 text-sm overflow-y-auto max-h-[500px] space-y-4">
          <p>📖 ট্রেনিং সেন্টারের শিক্ষার্থীদের জন্য নিয়ম ও শৃঙ্খলা</p>
          <p>🌟 আমাদের প্রত্যাশা – তোমাদের প্রতিশ্রুতি</p>

          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>উপস্থিতি ও সময়নিষ্ঠা:</strong> ⏰ প্রতিদিন সময়মতো ক্লাসে যোগদান করা...
            </li>
            <li>
              <strong>পরিচ্ছন্নতা ও পোশাক:</strong> 👕 পরিচ্ছন্ন ও উপযুক্ত পোশাক পরিধান...
            </li>
            <li>
              <strong>শিখন পরিবেশ বজায় রাখা:</strong> 📚 ক্লাসে মনোযোগী হও...
            </li>
            <li>
              <strong>সহপাঠীদের প্রতি সম্মান:</strong> 🤝 বিনয়ী ও সহযোগিতামূলক আচরণ...
            </li>
            <li>
              <strong>সম্পদ ও যন্ত্রপাতি ব্যবহার:</strong> 💻 সঠিক ব্যবহার...
            </li>
            <li>
              <strong>নিষিদ্ধ কার্যকলাপ:</strong> 🚭 ধূমপান, মাদক, রাজনীতি...
            </li>
            <li>
              <strong>নিরাপত্তা ও শৃঙ্খলা:</strong> 🛡️ নিরাপত্তা নির্দেশনা মেনে চলা...
            </li>
            <li>
              <strong>পরীক্ষা ও মূল্যায়ন:</strong> 🕒 নির্ধারিত সময়ে জমা দিতে হবে...
            </li>
            <li>
              <strong>উপস্থিতি ও সার্টিফিকেট:</strong> ✅ ন্যূনতম উপস্থিতি বাধ্যতামূলক...
            </li>
            <li>
              <strong>নৈতিকতা ও চরিত্র গঠন:</strong> 🌿 সততা, শৃঙ্খলা ও দায়িত্বশীলতা...
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
