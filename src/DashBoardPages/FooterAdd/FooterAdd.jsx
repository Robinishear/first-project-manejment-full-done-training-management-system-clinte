import React, { useState } from "react";
import useAxiosSecure from "../../CustomHooks/useAxios"; // your axios hook

export default function FooterAdd() {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    email: "",
    phone: "",
    quickLinks: "",
    MonFri: "",
    Sat: "",
    Sun: "",
    copyright: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        email: formData.email,
        phone: formData.phone,
        quickLinks: formData.quickLinks.split(",").map((link) => link.trim()),
        address: {
          hours: {
            "Mon-Fri": formData.MonFri,
            "Sat": formData.Sat,
            "Sun": formData.Sun
          }
        },
        copyright: formData.copyright
      };

      const res = await axiosSecure.post("/footer", payload);
      if (res.data.success) {
        alert("Footer info added successfully!");
        setFormData({
          name: "",
          description: "",
          email: "",
          phone: "",
          quickLinks: "",
          MonFri: "",
          Sat: "",
          Sun: "",
          copyright: ""
        });
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add footer info");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-800 text-white rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Footer Info</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 rounded text-white border"/>
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 rounded text-white border"/>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 rounded text-white border"/>
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full p-2 rounded text-white border"/>
        <input type="text" name="quickLinks" placeholder="Quick Links (comma separated)" value={formData.quickLinks} onChange={handleChange} className="w-full p-2 rounded text-white border"/>
        <input type="text" name="MonFri" placeholder="Mon-Fri hours" value={formData.MonFri} onChange={handleChange} className="w-full p-2 rounded text-white border"/>
        <input type="text" name="Sat" placeholder="Sat hours" value={formData.Sat} onChange={handleChange} className="w-full p-2 rounded text-white border"/>
        <input type="text" name="Sun" placeholder="Sun hours" value={formData.Sun} onChange={handleChange} className="w-full p-2 rounded text-white border"/>
        <input type="text" name="copyright" placeholder="Copyright Text" value={formData.copyright} onChange={handleChange} className="w-full p-2 rounded text-white border"/>
        <button type="submit" className="w-full p-2 bg-blue-600 rounded font-bold">Add Footer</button>
      </form>
    </div>
  );
}
