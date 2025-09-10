// HeroSection.jsx
import React from "react";

export default function HeroSection() {
  return (
    <div className="relative bg-gray-900 mt-5 my-3">
      <div className="absolute bottom-0 right-0 overflow-hidden lg:inset-y-0">
        <img
          className="w-auto h-full"
          src="https://d33wubrfki0l68.cloudfront.net/1e0fc04f38f5896d10ff66824a62e466839567f8/699b5/images/hero/3/background-pattern.png"
          alt=""
        />
      </div>

      <header className="relative py-4 md:py-6">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between"></div>
        </div>
      </header>

      <section className="relative py-12 sm:py-16 lg:pt-20 lg:pb-36">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 gap-y-8 lg:items-center lg:grid-cols-2 sm:gap-y-20 xl:grid-cols-5">
            <div className="text-center xl:col-span-2 lg:text-left md:px-16 lg:px-0">
              <div className="max-w-sm mx-auto sm:max-w-md md:max-w-full">
                <h1 className="text-3xl text-gray-600 font-bold leading-tight  sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">
                  Build your future with skills, not just degrees.
                </h1>

                <div className="mt-8 lg:mt-12 lg:flex lg:items-center">
                  <div className="flex justify-center flex-shrink-0 -space-x-4 overflow-hidden lg:justify-start">
                    <img
                      className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                      src="https://i.ibb.co.com/svLW3g2r/Whats-App-Image-2025-09-07-at-9-25-21-AM.jpg"
                      alt=""
                    />
                    <img
                      className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                      src="https://i.ibb.co.com/FqyJFwnH/Whats-App-Image-2025-09-07-at-9-25-05-AM.jpg"
                      alt=""
                    />
                    <img
                      className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                      src="https://i.ibb.co.com/x8rvVqcb/Whats-App-Image-2025-09-07-at-9-24-57-AM.jpg"
                      alt=""
                    />
                    <img
                      className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                      src="https://i.ibb.co.com/dJXBrBNd/Whats-App-Image-2025-09-07-at-9-24-47-AM.jpg"
                      alt=""
                    />
                    <img
                      className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                      src="https://i.ibb.co.com/3y0Fj55v/Whats-App-Image-2025-09-07-at-9-24-41-AM.jpg"
                      alt=""
                    />
                  </div>
                  <p className="mt-4 text-lg lg:mt-0 lg:ml-4 font-pj">
                    Join our Class{" "}
                    <span className="font-bold">1600+ students</span>. Your
                    Future Begins Here – Learn, Grow, Succeed
                  </p>
                </div>
              </div>
            </div>

            <div className="xl:col-span-3 ">
              ✨ কারিগরি শিক্ষা নিলে, দেশ-বিদেশে চাকরি মিলে ✨ আজকের দুনিয়ায়
              শুধু বইয়ের জ্ঞান যথেষ্ট নয়—প্রয়োজন বাস্তব অভিজ্ঞতা। তাই আমরা
              নিয়ে এসেছি একটি আধুনিক ট্রেনিং সেন্টার, যেখানে শিক্ষার্থীদের
              শেখানো হয় হাতে-কলমে ব্যবহারিক শিক্ষা। 📌 এখানে প্রতিটি শিক্ষার্থী
              নিজের হাতে কাজ করার সুযোগ পায়। 📌 আধুনিক যন্ত্রপাতি ও ল্যাবের
              মাধ্যমে বাস্তব অভিজ্ঞতা অর্জন করে। 📌 বিশেষজ্ঞ প্রশিক্ষকরা তত্ত্ব
              ও প্র্যাকটিক্যাল একসাথে শেখান। 📌 শিক্ষার্থীরা শুধু দক্ষ কর্মী
              নয়, আত্মনির্ভর নাগরিক হিসেবেও গড়ে ওঠে। 👉 আমাদের ট্রেনিং সেন্টার
              থেকে প্রশিক্ষণ নিয়ে আপনি পারবেন— চাকরির বাজারে প্রতিযোগিতায়
              এগিয়ে থাকতে দেশ-বিদেশে বিভিন্ন প্রতিষ্ঠানে কাজের সুযোগ পেতে নিজে
              উদ্যোক্তা হয়ে কর্মসংস্থান তৈরি করতে 🌟 আমাদের মূলমন্ত্র: “শেখা
              শুধু বইয়ে নয়, শেখা বাস্তব জীবনের কাজে।” আজই ভর্তি হন, হাতে-কলমে
              শিক্ষা নিয়ে গড়ুন আপনার ভবিষ্যৎ!
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
