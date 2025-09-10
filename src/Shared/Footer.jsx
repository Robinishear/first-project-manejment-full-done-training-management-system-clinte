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
          </div>
        </div>
      </div>
    </footer>
  );
}
