import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function FooterList() {
  const [footers, setFooters] = useState([]);
  const [selectedFooter, setSelectedFooter] = useState(null); // modal data
  const [showModal, setShowModal] = useState(false);

  // Fetch footer
  const fetchFooter = async () => {
    try {
      const res = await axios.get("http://localhost:5000/footer");
      if (res.data.success && res.data.data) {
        setFooters([res.data.data]);
      } else {
        setFooters([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFooter();
  }, []);

  // Delete footer
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the footer permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#EC4899",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/footer/${id}`);
          Swal.fire("Deleted!", "Footer has been deleted.", "success");
          fetchFooter();
        } catch (err) {
          Swal.fire("Error!", "Could not delete footer.", "error");
        }
      }
    });
  };

  // Open modal with selected footer data
  const handleUpdate = (footer) => {
    setSelectedFooter(footer);
    setShowModal(true);
  };

  // Update footer
  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/footer/${selectedFooter._id}`,
        selectedFooter
      );
      Swal.fire("Updated!", "Footer updated successfully.", "success");
      setShowModal(false);
      fetchFooter();
    } catch (err) {
      Swal.fire("Error!", "Could not update footer.", "error");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Footer List</h1>
      {footers.length === 0 ? (
        <p>No footer found.</p>
      ) : (
        footers.map((footer) => (
          <div
            key={footer._id}
            className="p-4 mb-4 border rounded-2xl bg-gray-800 text-white"
          >
            <h2 className="font-bold text-xl">{footer.name}</h2>
            <p>{footer.description}</p>
            <p>📧 {footer.email}</p>
            <p>📞 {footer.phone}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleUpdate(footer)}
                className="px-4 py-2 bg-blue-600 rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(footer._id)}
                className="px-4 py-2 bg-red-600 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {/* ✅ Modal */}
      {showModal && selectedFooter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="border bg-gray-900 rounded-2xl p-6 w-[600px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Update Footer</h2>

            <label className="block mb-2">Name</label>
            <input
              type="text"
              value={selectedFooter.name}
              onChange={(e) =>
                setSelectedFooter({ ...selectedFooter, name: e.target.value })
              }
              className="w-full p-2 mb-4 border rounded"
            />

            <label className="block mb-2">Email</label>
            <input
              type="text"
              value={selectedFooter.email}
              onChange={(e) =>
                setSelectedFooter({ ...selectedFooter, email: e.target.value })
              }
              className="w-full p-2 mb-4 border rounded"
            />

            <label className="block mb-2">Phone</label>
            <input
              type="text"
              value={selectedFooter.phone}
              onChange={(e) =>
                setSelectedFooter({ ...selectedFooter, phone: e.target.value })
              }
              className="w-full p-2 mb-4 border rounded"
            />

            <label className="block mb-2">Description</label>
            <textarea
              value={selectedFooter.description}
              onChange={(e) =>
                setSelectedFooter({
                  ...selectedFooter,
                  description: e.target.value,
                })
              }
              className="w-full p-2 mb-4 border rounded"
            />

            <label className="block mb-2">Quick Links (comma separated)</label>
            <input
              type="text"
              value={selectedFooter.quickLinks?.join(", ") || ""}
              onChange={(e) =>
                setSelectedFooter({
                  ...selectedFooter,
                  quickLinks: e.target.value.split(","),
                })
              }
              className="w-full p-2 mb-4 border rounded"
            />

            <label className="block mb-2">Opening Hours</label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Mon-Fri"
                value={selectedFooter.address?.hours?.["Mon-Fri"] || ""}
                onChange={(e) =>
                  setSelectedFooter({
                    ...selectedFooter,
                    address: {
                      ...selectedFooter.address,
                      hours: {
                        ...selectedFooter.address?.hours,
                        "Mon-Fri": e.target.value,
                      },
                    },
                  })
                }
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Sat"
                value={selectedFooter.address?.hours?.Sat || ""}
                onChange={(e) =>
                  setSelectedFooter({
                    ...selectedFooter,
                    address: {
                      ...selectedFooter.address,
                      hours: {
                        ...selectedFooter.address?.hours,
                        Sat: e.target.value,
                      },
                    },
                  })
                }
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Sun"
                value={selectedFooter.address?.hours?.Sun || ""}
                onChange={(e) =>
                  setSelectedFooter({
                    ...selectedFooter,
                    address: {
                      ...selectedFooter.address,
                      hours: {
                        ...selectedFooter.address?.hours,
                        Sun: e.target.value,
                      },
                    },
                  })
                }
                className="p-2 border rounded"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
