import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";

const HomeSlider = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/homeSlider")
      .then((res) => setBanners(res.data));
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto mt-5 p-4 rounded-2xl bg-gray-800 bg-opacity-80 backdrop-blur-sm shadow-xl border border-gray-700">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows
        interval={6000}
        transitionTime={1000}
      >
        {banners.map(({ src, alt, legend }, idx) => (
          <div key={idx} className="relative rounded-xl overflow-hidden">
            <img className="h-90 object-cover rounded-xl" src={src} alt={alt} />
            <div className="absolute inset-0 to-transparent rounded-xl"></div>
            <p className="legend relative z-10 text-gray-100 font-semibold">
              {legend}
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HomeSlider;
