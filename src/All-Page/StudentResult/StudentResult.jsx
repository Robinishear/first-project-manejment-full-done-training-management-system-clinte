import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosSecure from "../../CustomHooks/useAxios";
import leftLogo from "../../../public/logo.jpeg";

// Framer Motion variants for animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const tableRowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function StudentResult({
  govtLine = "Government of the People's Republic of Bangladesh",
  institute = "Bangladesh Technical Education Institute",
  website = "mdrobinahmed57898@gmail.com",
  regNo = "750279",
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudent, setFilteredStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleSearch = async (e) => {
    const query = e.target.value.toUpperCase();
    setSearchQuery(query);
    setLoading(true);

    if (query.length > 0) {
      try {
        const { data } = await axiosSecure.get(`/studentResult/${query}`);
        setFilteredStudent(data);
      } catch (error) {
        setFilteredStudent(null);
        if (error.response && error.response.status === 404) {
          console.log("Student not found.");
        } else {
          console.error("Error fetching student:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to fetch student data. Please try again.",
            background: "#1F2937",
            color: "#D1D5DB",
          });
        }
      } finally {
        setLoading(false);
      }
    } else {
      setFilteredStudent(null);
      setLoading(false);
    }
  };
console.log(filteredStudent);
  const studentDetails = filteredStudent
    ? [
        { label: "Name of Student", value: filteredStudent.studentName },
        { label: "Father's Name", value: filteredStudent.fatherName },
        { label: "Mother's Name", value: filteredStudent.motherName },
        { label: "Date of Birth", value: filteredStudent.dob },
        { label: "Institute Name", value: filteredStudent.institute },
        { label: "Institute Code", value: filteredStudent.branchId },
        { label: "Roll", value: filteredStudent.studentId },
        { label: "picture", value: filteredStudent.studentId },
        { label: "Registration No", value: filteredStudent.passport },
        { label: "Student Type", value: "Regular" },
        { label: "Course Duration", value: filteredStudent.duration },
        { label: "Session", value: filteredStudent.session },
        { label: "Course Name", value: filteredStudent.searchCourse },
        { label: "CGPA Result", value: filteredStudent.cgpa },
      ]
    : [];

  const finalResultDetails = filteredStudent
    ? [
        { label: "Written", value: filteredStudent.writtenMarks ?? "N/A" },
        { label: "Practical", value: filteredStudent.practicalMark ?? "N/A" },
        { label: "Viva", value: filteredStudent.vivaMarks ?? "N/A" },
        { label: "Total", value: filteredStudent.totalMarks ?? "N/A" },
        { label: "Full Mark", value: filteredStudent.fullMark ?? "N/A" },
        { label: "CGPA", value: filteredStudent.cgpa ?? "N/A" },
        { label: "Grade", value: filteredStudent.letterGrade ?? "N/A" },
      ]
    : [];

  // Check if any academic record has a non-empty mark
  const hasAcademicMarks = filteredStudent?.academicRecords?.some(
    (record) => record.mark !== ""
  );

  return (
    <motion.div
      className="  font-sans bg-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="max-w-6xl mx-auto my-8 p-6  shadow-xl rounded-lg border border-gray-200"
        variants={itemVariants}
      >
        <motion.h2
          className="text-2xl font-bold mb-6 text-gray-800 text-center border-b pb-2 border-gray-300"
          variants={itemVariants}
        >
          RESULT SHEET
        </motion.h2>

        {/* Search Input Section */}
        <motion.div variants={itemVariants} className="mb-6 print:hidden">
          <label
            htmlFor="studentId"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Enter Student ID
          </label>
          <input
            type="text"
            id="studentId"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="e.g., 750279"
            className="w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </motion.div>

        {/* Student Details & Results */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              className="text-center text-gray-600 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className="loading loading-dots loading-lg text-gray-600"></span>
            </motion.div>
          ) : filteredStudent ? (
            <motion.div
              key="details"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="">
                {/* Main Details Table */}
                <header className="bg-white flex items-center justify-between px-6 py-4 shadow-sm border-b border-gray-200 print:bg-transparent">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      src={leftLogo}
                      alt="Seal of Bangladesh"
                      className="w-38 h-46 object-cover border  p-1 bg-white"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 text-center text-gray-900 min-w-0">
                    <p className="text-xs leading-tight font-medium">
                      {govtLine}
                    </p>
                    <h1 className="text-3xl md:text-3xl font-bold leading-tight mt-1">
                      {institute}
                    </h1>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-4 text-xs mt-1">
                      <p className="leading-tight">website: {website}</p>
                      <p className="leading-tight">Govt. Reg No: {regNo}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex items-center">
                    {/* Image Section */}
                    <div className="flex justify-center items-start pt-2 md:pt-0 ">
                      <img
                        src={`${filteredStudent.picture}`}
                        alt="Student"
                        className="w-38 h-46 object-cover border border-gray-300 p-1 bg-white"
                      />
                    </div>
                  </div>
                </header>

                <div className="col-span-1">
                  <table className="min-w-full  divide-y divide-gray-300 border border-gray-800">
                    <tbody className="divide-y divide-gray-200 ">
                      {studentDetails.map((detail, index) => (
                        <motion.tr
                          key={index}
                          variants={tableRowVariants}
                          className={
                            index % 2 === 0 ? "bg-gray-200" : "bg-white"
                          }
                        >
                          <td className="w-1/3 text-xl  font-medium text-gray-700 border text-left px-2">
                            {detail.label}
                          </td>
                          <td className="w-2/3 text-xl text-gray-900 break-words border text-left px-2">
                            {detail.value}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Academic Records Section */}
              {/* Academic Records Section */}
              {hasAcademicMarks && (
                <div className="overflow-hidden border border-gray-300 shadow-lg my-5">
                  {/* Add the table-auto class to the table element for automatic column sizing */}
                  <table className="min-w-full divide-y divide-gray-300 bg-gray-100 table-auto">
                    <thead className="bg-gray-200">
                      <tr>
                        <th
                          colSpan="7"
                          className="p-2 text-black text-center text-sm font-semibold uppercase tracking-wider  border-b border"
                        >
                          Semester Wise Results
                        </th>
                      </tr>
                      <tr>
                        {/* Apply flex-grow-1 to each header for even distribution */}
                        <th className="px-3   text-gray-700 border flex-grow-1 text-center">
                          Semester
                        </th>
                        <th className="px-3  text-center text-gray-700 border flex-grow-1">
                          Grade
                        </th>
                        <th className="px-3  text-center text-gray-700 border flex-grow-1">
                          Marks
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      
                      {filteredStudent.academicRecords
                        .filter((record) => record.mark !== "")
                        .map((record, recordIndex) => (
                          <tr key={recordIndex}>
                            {/* Apply flex-grow-1 to each cell for even distribution */}
                            <td className="px-3  text-gray-900 border flex-grow-1 text-center w-1/3">
                              {record.semester} Semester
                            </td>
                            <td className="px-3  text-gray-900 border flex-grow-1 text-center">
                              {record.grade}
                            </td>
                            <td className="px-3  text-gray-900 border flex-grow-1 text-center">
                              {record.mark}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
              {/* Course Wise Grade/Marks Table */}
              <div className="mt-8">
                <table className="min-w-full border border-gray-300">
                  <thead className="bg-gray-200">
                    <tr>
                      <th
                        colSpan="7"
                        className="p-2 text-center text-sm font-semibold uppercase tracking-wider text-gray-700 border-b  border"
                      >
                        Course Wise Grade/Marks
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      {finalResultDetails.map((detail, index) => (
                        <td
                          key={index}
                          className=" text-center font-semibold text-gray-700 uppercase border-r   border"
                        >
                          {detail.label}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      {finalResultDetails.map((detail, index) => (
                        <td
                          key={index}
                          className="w-1/7 text-center text-gray-900 border-r border "
                        >
                          {detail.value}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : searchQuery ? (
            <motion.p
              key="not-found"
              className="text-center text-gray-500 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No student found with that ID.
            </motion.p>
          ) : (
            <motion.p
              key="instructions"
              className="text-center text-gray-500 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Enter a student ID to view their details.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
