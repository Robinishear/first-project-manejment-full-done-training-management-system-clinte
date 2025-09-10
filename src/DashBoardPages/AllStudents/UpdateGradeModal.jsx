import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../CustomHooks/useAxios";


// helper: convert CGPA → Grade
const getGradeFromCgpa = (cgpa) => {
  if (cgpa >= 4.0) return "A+";
  if (cgpa >= 3.75) return "A";
  if (cgpa >= 3.5) return "A-";
  if (cgpa >= 3.25) return "B+";
  if (cgpa >= 3.0) return "B";
  if (cgpa >= 2.75) return "B-";
  if (cgpa >= 2.5) return "C+";
  if (cgpa >= 2.25) return "C";
  if (cgpa >= 2.0) return "D";
  return "F";
};

const UpdateGradeModal = ({ userId, setUpdateGradeModal }) => {
  const [subjects, setSubjects] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    getData();
  }, [userId]);

  const getData = async () => {
    try {
      const res = await axiosSecure(`/StudentsList/${userId}`);
      const formattedSubjects = (res?.data?.subjects || []).map((s) => ({
        ...s,
        cgpa: s.cgpa !== undefined ? s.cgpa.toString() : "",
      }));
      setSubjects(formattedSubjects);
    } catch (err) {
      console.error("Error fetching student data:", err);
    }
  };

  const handleCgpaChange = (index, value) => {
    // allow only numbers, dot, or empty string
    if (!/^\d*\.?\d*$/.test(value)) return;

    // prevent CGPA > 4
    if (parseFloat(value) > 4) return;

    // limit to 2 decimal places
    if (value.includes(".") && value.split(".")[1].length > 2) return;

    const updated = [...subjects];
    updated[index].cgpa = value;

    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      updated[index].grade = getGradeFromCgpa(numericValue);
    } else {
      updated[index].grade = "-";
    }

    setSubjects(updated);
  };

  const handleUpdate = async () => {
    try {
      const res = await axiosSecure.patch(`/StudentsList/${userId}`, {
        subjects: subjects.map(({ name, semester, cgpa, grade }) => ({
          name,
          semester,
          cgpa: parseFloat(cgpa) || 0,
          grade,
        })),
      });

      if (res.data.success) {
        alert("Grades updated successfully!");
        setUpdateGradeModal(false);
      }
    } catch (err) {
      console.error("Error updating grades:", err);
      alert("Failed to update grades");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-950 bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 text-gray-100 rounded-lg shadow-xl p-8 max-w-6xl w-full backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-indigo-400 mb-6 text-center">
          Update Result
        </h2>

        <div className="overflow-x-auto mb-8">
          <table className="min-w-full rounded-md border border-gray-700">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-4 py-2 text-left text-gray-300 font-medium">
                  Subject
                </th>
                <th className="px-4 py-2 text-left text-gray-300 font-medium">
                  Semester
                </th>
                <th className="px-4 py-2 text-left text-gray-300 font-medium">
                  Grade
                </th>
                <th className="px-4 py-2 text-left text-gray-300 font-medium">
                  CGPA
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {subjects.map((subject, index) => (
                <tr key={index} className="bg-gray-800 hover:bg-gray-700">
                  <td className="px-4 py-2 text-gray-200">{subject.name}</td>
                  <td className="px-4 py-2 text-gray-200">
                    {subject.semester}
                  </td>
                  <td className="px-4 py-2 text-gray-200">
                    {subject.grade || "-"}
                  </td>
                  <td className="px-4 py-2 text-gray-200">
                    <input
                      className="bg-white text-black rounded-sm px-2 py-1 w-20"
                      type="number"
                      step="0.01"
                      min="0"
                      max="4"
                      value={subject.cgpa}
                      onChange={(e) =>
                        handleCgpaChange(index, e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={() => setUpdateGradeModal(false)}
            className="px-6 py-2 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-6 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateGradeModal;