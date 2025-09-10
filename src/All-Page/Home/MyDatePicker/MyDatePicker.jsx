import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MyDatePicker() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Custom input button for DatePicker
  const ExampleCustomInput = forwardRef(
    ({ value, onClick, className }, ref) => (
      <button
        type="button"
        className={
          className ||
          "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        }
        onClick={onClick}
        ref={ref}
      >
        {value}
      </button>
    )
  );

  return (
    <div className="border border-gray-600 rounded-2xl bg-gray-900 mt-10 min-h-screen p-6 flex flex-col items-center gap-10">
      {/* DatePicker Section */}
      <div className="p-6 max-w-sm w-full border border-gray-600 rounded-2xl bg-slate-800 text-white">
        <h2 className="text-lg font-bold mb-4">Select a Date</h2>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          customInput={<ExampleCustomInput />}
          dateFormat="MMMM d, yyyy"
        />
        <p className="mt-3 text-white">
          Selected date: {selectedDate.toDateString()}
        </p>
      </div>

      {/* Hero Section */}
      <section className=" w-full">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-sm dark:text-white">
              The National Revolutionary Song of Bangladesh By <span className="text-2xl font-bold"> Kazi Nazrul Islam</span> <br />
              March on, march on, march! Above, the drums resound in the sky,
              Below, the earth trembles with fiery steps. The youthful bands of
              dawn rise— March on, O march, march, march, march! At the
              threshold of the morning, we shall strike with courage, We shall
              bring a glorious red dawn, Breaking the dark night that binds the
              world, Forward we march, never turning back. With songs of the new
              and the youthful, We shall breathe life into the silent grounds of
              despair, We shall give strength to the arms of the young, And
              awaken a force that has never yet been seen. Forward, O youth!
              Open your ears and listen— At the gateways where death and fear
              linger, Life itself calls to you. Break the chains, shatter the
              barriers, And march, march onward without hesitation. Let the
              crimson morning rise from every shadow, Let the light of hope
              pierce the deepest gloom, Let the songs of the new, of courage, of
              freedom, Resound in every heart, in every hand, in every step.
              March on, march on, O brave young warriors, Do not pause, do not
              waver, Until the night of oppression is shattered, Until the dawn
              of liberation shines upon all. The drums call, the ground shakes,
              The youth rise, unbroken and undaunted. March onward into the
              light of tomorrow, March onward into the glory of life, March on,
              march on, march, march, march!
            </h1>
            <p className="max-w-2xl text-sm mb-6 font-light text-gray-500  dark:text-gray-400">
              বাংলাদেশের জাতীয় রণ সংগীত: কাজী নজরুল ইসলাম <br />  চল্ চল্ চল্ ঊর্ধ্ব
              গগনে বাজে মাদল নিম্নে উতলা ধরণী-তল অরুণ প্রাতের তরুণ দল চল্ রে চল্
              রে চল্ চল্ চল্ চল্। ঊষার দুয়ারে হানি আঘাত আমরা আনিব রাঙা প্রভাত
              আমরা টুটাব তিমির রাত বাঁধার বিন্ধ্যা চল। নব নবীনের গাহিয়া গান
              সজীব করিব মহাশ্মশান আমরা দানিব নতুন প্রাণ বাহুতে নবীন বল। চল রে
              নওজোয়ান শোন রে পাতিয়া কান মৃত্যু-তোরণ-দুয়ারে-দুয়ারে জীবনের
              আহ্বান ভাঙ রে ভাঙ আগল চল রে চল্ রে চল্ চল্ চল্ চল্। বাংলাদেশের
              জাতীয় রণ সংগীত: কাজী নজরুল ইসলাম চল্ চল্ চল্ ঊর্ধ্ব গগনে বাজে
              মাদল নিম্নে উতলা ধরণী-তল অরুণ প্রাতের তরুণ দল চল্ রে চল্ রে চল্
              চল্ চল্ চল্। ঊষার দুয়ারে হানি আঘাত আমরা আনিব রাঙা প্রভাত আমরা
              টুটাব তিমির রাত বাঁধার বিন্ধ্যা চল। নব নবীনের গাহিয়া গান সজীব
              করিব মহাশ্মশান আমরা দানিব নতুন প্রাণ বাহুতে নবীন বল। চল রে
              নওজোয়ান শোন রে পাতিয়া কান মৃত্যু-তোরণ-দুয়ারে-দুয়ারে জীবনের
              আহ্বান ভাঙ রে ভাঙ আগল চল রে চল্ রে চল্ চল্ চল্ চল্।
            </p>
          </div>
          <div className="lg:flex lg:col-span-5 lg:mt-0">
            <img
              src="https://i.ibb.co.com/fgpZWJX/images-1.jpg"
              alt="mockup"
              className="w-full h-110 mt-10 rounded-2xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
