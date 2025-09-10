import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";

export default function EditStudentModalDashBoard({
  isOpen,
  onClose,
  studentData,
  onSave,
}) {
  const [editedData, setEditedData] = useState(() => {
    const academicRecords = Array.from({ length: 8 }, (_, i) => {
      const semesterNumber = `${i + 1}th`;
      const existingRecord =
        studentData.academicRecords?.find(
          (rec) => rec.semester === semesterNumber
        ) || {};
      return {
        semester: semesterNumber,
        grade: existingRecord.grade || "",
        mark: existingRecord.mark || "",
      };
    });

    const calculatedTotalMarks =
      (Number(studentData.writtenMarks) || 0) +
      (Number(studentData.vivaMarks) || 0) +
      (Number(studentData.practicalMark) || 0);

    return {
      ...studentData,
      academicRecords,
      totalMarks: calculatedTotalMarks,
      fullMark: studentData.fullMark || "",
      vivaMarks: studentData.vivaMarks || "",
      writtenMarks: studentData.writtenMarks || "",
      practicalMark: studentData.practicalMark || "",
      letterGrade: studentData.letterGrade || "",
      cgpa: studentData.cgpa || "",
      subjects: studentData.subjects || [],
      // Added new fields
      publicationDate: studentData.publicationDate || "",
      examinationMonth: studentData.examinationMonth || "",
    };
  });

  const [newSubject, setNewSubject] = useState({ name: "", semester: "1st" });

  useEffect(() => {
    if (studentData) {
      const academicRecords = Array.from({ length: 8 }, (_, i) => {
        const semesterNumber = `${i + 1}th`;
        const existingRecord =
          studentData.academicRecords?.find(
            (rec) => rec.semester === semesterNumber
          ) || {};
        return {
          semester: semesterNumber,
          grade: existingRecord.grade || "",
          mark: existingRecord.mark || "",
        };
      });
      setEditedData({
        ...studentData,
        academicRecords,
        fullMark: studentData.fullMark || "",
        vivaMarks: studentData.vivaMarks || "",
        writtenMarks: studentData.writtenMarks || "",
        practicalMark: studentData.practicalMark || "",
        letterGrade: studentData.letterGrade || "",
        cgpa: studentData.cgpa || "",
        subjects: studentData.subjects || [],
        // Added new fields
        publicationDate: studentData.publicationDate || "",
        examinationMonth: studentData.examinationMonth || "",
      });
    }
  }, [studentData]);

  // Recalculate total marks whenever viva, written, or practical marks change
  useEffect(() => {
    const newTotalMarks =
      (Number(editedData.writtenMarks) || 0) +
      (Number(editedData.vivaMarks) || 0) +
      (Number(editedData.practicalMark) || 0);
    setEditedData((prev) => ({
      ...prev,
      totalMarks: newTotalMarks,
    }));
  }, [editedData.writtenMarks, editedData.vivaMarks, editedData.practicalMark]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (index === null) {
      setEditedData((prev) => ({ ...prev, [name]: value }));
    } else {
      setEditedData((prev) => {
        const newAcademicRecords = [...prev.academicRecords];
        newAcademicRecords[index] = {
          ...newAcademicRecords[index],
          [name]: value,
        };
        return { ...prev, academicRecords: newAcademicRecords };
      });
    }
  };

  const handleSubjectChange = (e) => {
    const { name, value } = e.target;
    setNewSubject((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubject = () => {
    if (newSubject.name.trim() !== "") {
      setEditedData((prev) => ({
        ...prev,
        subjects: [...prev.subjects, newSubject],
      }));
      setNewSubject({ name: "", semester: "1st" });
    }
  };

  const handleDeleteSubject = (index) => {
    setEditedData((prev) => {
      const newSubjects = prev.subjects.filter((_, i) => i !== index);
      return { ...prev, subjects: newSubjects };
    });
  };

  const handleSave = () => {
    console.log("Saving student data:", editedData);
    onSave(editedData);
  };

  const excludedKeys = [
    "_id",
    "branchId",
    "academicRecords",
    "totalMarks",
    "fullMark",
    "vivaMarks",
    "writtenMarks",
    "practicalMark",
    "letterGrade",
    "cgpa",
    "subjects",
    // Excluded the new keys so we can render them separately
    "publicationDate",
    "examinationMonth",
  ];

  const displayKeys = Object.keys(editedData).filter(
    (key) => !excludedKeys.includes(key)
  );

  const grades = ["A+", "A", "A-", "B", "C", "D", "F"];
  const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

  return (
    <div className="fixed inset-0 bg-gray-950 bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 text-gray-100 rounded-lg shadow-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-indigo-400 mb-6 text-center">
          Edit Student Information
        </h2>

        {/* Main Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {displayKeys.map((key) => (
            <div key={key}>
              <label
                htmlFor={key}
                className="block text-gray-300 capitalize text-sm mb-1"
              >
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <input
                type="text"
                name={key}
                id={key}
                value={editedData[key] || ""}
                onChange={(e) => handleChange(e, null)}
                className="w-full rounded-md bg-gray-900 text-gray-100 border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}
        </div>

        {/* Add Subjects Section */}
        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-4 border-b border-gray-700 pb-2">
          Add Subjects
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label
              htmlFor="subjectName"
              className="block text-gray-300 capitalize text-sm mb-1"
            >
              Subject Name
            </label>
            <input
              type="text"
              name="name"
              id="subjectName"
              value={newSubject.name}
              onChange={handleSubjectChange}
              className="w-full rounded-md bg-gray-900 text-gray-100 border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="subjectSemester"
              className="block text-gray-300 capitalize text-sm mb-1"
            >
              Semester
            </label>
            <select
              name="semester"
              id="subjectSemester"
              value={newSubject.semester}
              onChange={handleSubjectChange}
              className="w-full rounded-md bg-gray-900 text-gray-100 border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {semesters.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleAddSubject}
              className="w-full px-4 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Add Subject
            </button>
          </div>
        </div>

        {/* Subject Preview Table */}
        <h3 className="text-xl font-semibold text-gray-200 mb-4 border-b border-gray-700 pb-2">
          Subject Preview
        </h3>
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
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {editedData.subjects.map((subject, index) => (
                <tr key={index} className="bg-gray-800 hover:bg-gray-700">
                  <td className="px-4 py-2 text-gray-200">{subject.name}</td>
                  <td className="px-4 py-2 text-gray-200">{subject.semester}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeleteSubject(index)}
                      className="text-red-400 hover:text-red-500 transition-colors"
                      aria-label={`Delete ${subject.name}`}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold text-gray-200 mb-4 border-b border-gray-700 pb-2">
          Academic Details
        </h3>

        {/* Academic Information Table/Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {editedData.academicRecords.map((record, index) => (
            <div key={record.semester} className="p-4 bg-gray-900 rounded-md">
              <h4 className="text-gray-200 font-medium mb-2">
                {record.semester} Semester
              </h4>

              {/* Grade dropdown */}
              <div>
                <label
                  htmlFor={`grade-${index}`}
                  className="block text-gray-400 capitalize text-sm mb-1"
                >
                  Grade
                </label>
                <select
                  name="grade"
                  id={`grade-${index}`}
                  value={record.grade}
                  onChange={(e) => handleChange(e, index)}
                  className="w-full rounded-md bg-gray-800 text-gray-100 border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Grade</option>
                  {grades.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mark input field */}
              <div className="mt-4">
                <label
                  htmlFor={`mark-${index}`}
                  className="block text-gray-400 capitalize text-sm mb-1"
                >
                  Mark
                </label>
                <input
                  type="number"
                  name="mark"
                  id={`mark-${index}`}
                  value={record.mark}
                  onChange={(e) => handleChange(e, index)}
                  className="w-full rounded-md bg-gray-800 text-gray-100 border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          ))}
        </div>

        {/* New Final Result Section */}
        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-4 border-b border-gray-700 pb-2">
          Final Result
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label
              htmlFor="fullMark"
              className="block text-gray-300 capitalize text-sm mb-1"
            >
              Full Mark
            </label>
            <input
              type="number"
              name="fullMark"
              id="fullMark"
              value={editedData.fullMark}
              onChange={(e) => handleChange(e, null)}
              className="w-full rounded-md bg-gray-900 text-gray-100 border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="writtenMarks"
              className="block text-gray-300 capitalize text-sm mb-1"
            >
              Written Marks
            </label>
            <input
              type="number"
              name="writtenMarks"
              id="writtenMarks"
              value={editedData.writtenMarks}
              onChange={(e) => handleChange(e, null)}
              className="w-full rounded-md bg-gray-900 text-gray-100 border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="vivaMarks"
              className="block text-gray-300 capitalize text-sm mb-1"
            >
              Viva Marks
            </label>
            <input
              type="number"
              name="vivaMarks"
              id="vivaMarks"
              value={editedData.vivaMarks}
              onChange={(e) => handleChange(e, null)}
              className="w-full rounded-md bg-gray-900 text-gray-100 border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="practicalMark"
              className="block text-gray-300 capitalize text-sm mb-1"
            >
              Practical Mark
            </label>
            <input
              type="number"
              name="practicalMark"
              id="practicalMark"
              value={editedData.practicalMark}
              onChange={(e) => handleChange(e, null)}
              className="w-full rounded-md bg-gray-900 text-gray-100 border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="totalMarks"
              className="block text-gray-300 capitalize text-sm mb-1"
            >
              Total Marks
            </label>
            <input
              type="number"
              name="totalMarks"
              id="totalMarks"
              value={editedData.totalMarks}
              readOnly
              className="w-full rounded-md bg-gray-900 text-gray-100 border border-gray-700 px-3 py-2 cursor-not-allowed"
            />
          </div>
          <div>
            <label
              htmlFor="letterGrade"
              className="block text-gray-300 capitalize text-sm mb-1"
            >
              Letter Grade
            </label>
            <select
              name="letterGrade"
              id="letterGrade"
              value={editedData.letterGrade}
              onChange={(e) => handleChange(e, null)}
              className="w-full rounded-md bg-gray-900 text-gray-100 border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Grade</option>
              {grades.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="cgpa"
              className="block text-gray-300 capitalize text-sm mb-1"
            >
              CGPA
            </label>
            <input
              type="number"
              name="cgpa"
              id="cgpa"
              value={editedData.cgpa}
              onChange={(e) => handleChange(e, null)}
              step="0.01"
              className="w-full rounded-md bg-gray-900 text-gray-100 border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {/* Added new input fields here */}
          <div>
            <label
              htmlFor="publicationDate"
              className="block text-gray-300 capitalize text-sm mb-1"
            >
              Publication Date
            </label>
            <input
              type="text"
              name="publicationDate"
              id="publicationDate"
              value={editedData.publicationDate}
              onChange={(e) => handleChange(e, null)}
              className="w-full rounded-md bg-gray-900 text-gray-100 border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="examinationMonth"
              className="block text-gray-300 capitalize text-sm mb-1"
            >
              Examination Month
            </label>
            <input
              type="text"
              name="examinationMonth"
              id="examinationMonth"
              value={editedData.examinationMonth}
              onChange={(e) => handleChange(e, null)}
              className="w-full rounded-md bg-gray-900 text-gray-100 border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}