import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Footer() {
  const [footer, setFooter] = useState(null);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await axios.get("http://localhost:5000/footer"); // backend route
        if (res.data.success && res.data.data) {
          setFooter(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch footer:", error);
      }
    };

    fetchFooter();
  }, []);

  if (!footer) return null; // Loading or empty

  return (
    <footer className="via-gray-900 to-indigo-950 from-gray-950 border border-slate-700 rounded-2xl shadow-2xl ">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          {/* Logo Section */}
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <img
                src="https://i.ibb.co.com/Pv2JsgX1/d1c5d611-d237-463b-b186-5adab2a4e7f3.jpg"
                className="h-12 w-12 me-3 rounded  "
                alt="Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                {footer.name || "No Name"}
              </span>
            </a>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Resources
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                {footer.quickLinks?.map((link, idx) => (
                  <li key={idx} className="mb-4">
                    <a href="#" className="hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Contact
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">📧 {footer.email || "No Email"}</li>
                <li>📞 {footer.phone || "No Phone"}</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Opening Hours
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li>Mon-Fri: {footer.address?.hours["Mon-Fri"] || "-"}</li>
                <li>Sat: {footer.address?.hours["Sat"] || "-"}</li>
                <li>Sun: {footer.address?.hours["Sun"] || "-"}</li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2025 {footer.name || "Company"} - {footer.copyright || ""}
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-5">
            {/* Social icons */}
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <span className="sr-only">Facebook page</span>
              <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 8 19">
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <span className="sr-only">Twitter page</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 17">
                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
              </svg>
            </a>
            {/* Add more icons if needed */}
            <div></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
