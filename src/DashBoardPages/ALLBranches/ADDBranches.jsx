import React, { useEffect, useState } from "react";

export default function ADDBranches() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Load branches
  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const res = await fetch("http://localhost:5000/allBranches");
      const data = await res.json();
      setBranches(data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch Branches Error:", err);
    }
  };

  // Delete branch
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this branch?")) return;
    try {
      await fetch(`http://localhost:5000/allBranches/${id}`, {
        method: "DELETE",
      });
      fetchBranches();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  // Open update modal
  const handleEdit = (branch) => {
    setSelectedBranch(branch);
    setShowModal(true);
  };

  // Update branch
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedBranch) return;

 
    const { _id, ...updateData } = selectedBranch;

    try {
      const res = await fetch(`http://localhost:5000/allBranches/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      const result = await res.json();
      console.log("Update Result:", result);

      setShowModal(false);
      setSelectedBranch(null);
      fetchBranches();
    } catch (err) {
      console.error("Update Error:", err);
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="p-6 bg-gray-800 rounded-2xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-200">ADD Branches</h2>

      <div className="overflow-x-auto">
        <table className="table-auto shadow-2xl bg-gray-800 w-full text-left">
          <thead>
            <tr className="bg-gray-950 text-white">
              <th className="border-t p-2">branchId</th>
              <th className="border-t p-2">instituteName</th>
              <th className="border-t p-2">directorName</th>
              <th className="border-t p-2">fatherName</th>
              <th className="border-t p-2">motherName</th>
              <th className="border-t p-2">email</th>
              <th className="border-t p-2">password</th>
              <th className="border-t p-2">mobileNumber</th>
              <th className="border-t p-2">address</th>
              <th className="border-t p-2">postOffice</th>
              <th className="border-t p-2">upazila</th>
              <th className="border-t p-2">district</th>
              <th className="border-t p-2">username</th>
              <th className="border-t p-2">directorPhoto</th>
              <th className="border-t p-2">institutePhoto</th>
              <th className="border-t p-2">nationalIdPhoto</th>
              <th className="border-t p-2">signaturePhoto</th>
              <th className="border-t p-2">status</th>
              <th className="border-t p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {branches.map((branch) => (
              <tr
                key={branch._id}
                className="border-t hover:bg-gray-900 transition-colors"
              >
                <td className="border-t p-2">{branch.branchId}</td>
                <td className="border-t p-2">{branch.instituteName}</td>
                <td className="border-t p-2">{branch.directorName}</td>
                <td className="border-t p-2">{branch.fatherName}</td>
                <td className="border-t p-2">{branch.motherName}</td>
                <td className="border-t p-2">{branch.email}</td>
                <td className="border-t p-2">{branch.password}</td>
                <td className="border-t p-2">{branch.mobileNumber}</td>
                <td className="border-t p-2">{branch.address}</td>
                <td className="border-t p-2">{branch.postOffice}</td>
                <td className="border-t p-2">{branch.upazila}</td>
                <td className="border-t p-2">{branch.district}</td>
                <td className="border-t p-2">{branch.username}</td>
                <td className="border-t p-2">{branch.directorPhoto}</td>
                <td className="border-t p-2">{branch.institutePhoto}</td>
                <td className="border-t p-2">{branch.nationalIdPhoto}</td>
                <td className="border-t p-2">{branch.signaturePhoto}</td>
                <td className="border-t p-2">{branch.status}</td>
                <td className="border-t p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(branch)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(branch._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {showModal && selectedBranch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-xl">
            <h3 className="text-xl font-bold mb-4 text-white">Update Branch</h3>
            <form
              onSubmit={handleUpdate}
              className="space-y-3 max-h-[70vh] overflow-y-auto"
            >
              {Object.keys(selectedBranch).map((key) => {
                if (key === "_id") return null; // _id skip
                return (
                  <input
                    key={key}
                    type="text"
                    value={selectedBranch[key] || ""}
                    onChange={(e) =>
                      setSelectedBranch({
                        ...selectedBranch,
                        [key]: e.target.value,
                      })
                    }
                    placeholder={key}
                    className="w-full p-2 rounded border bg-gray-700 text-white"
                  />
                );
              })}

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedBranch(null);
                  }}
                  className="bg-gray-400 px-4 py-2 rounded text-white hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
