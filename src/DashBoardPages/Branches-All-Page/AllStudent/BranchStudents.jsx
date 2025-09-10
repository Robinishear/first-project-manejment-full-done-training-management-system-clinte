// BranchStudents.jsx
import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../CustomHooks/useAxios";
import useAuth from "../../../CustomHooks/useAuth";
import EditStudentModal from "./EditStudentModal";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import AdmitCardPDF from "./AdmitCardPDF";
import RegistrationCard from "./RegistrationCard";
import Certlflcate from "./Certlflcate";


export default function BranchStudents() {
  const initialStudents = useLoaderData();
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const currentUserEmail = user?.email;

  
  const admitRefs = useRef({});
  const regRefs = useRef({});
  const certRefs = useRef({});

  // Fetch current user info
  const { data: instituteData, isLoading: isInstituteDataLoading } = useQuery({
    queryKey: ["currentUserInfo", currentUserEmail],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `/currentUserInfo?email=${currentUserEmail}`
      );
      return result.data;
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const branchId = instituteData?.currentUserData?.branchId;

  // Filter students of current branch
  useEffect(() => {
    if (initialStudents && branchId) {
      const studentOfCurrentBranch = initialStudents.filter(
        (student) => student.branchId === branchId
      );
      setStudents(studentOfCurrentBranch);
    }
  }, [initialStudents, branchId]);

  // Edit student
  const handleEditClick = (student) => {
    setCurrentStudent(student);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async (editedStudent) => {
    try {
      const { _id, ...studentDataToSend } = editedStudent;
      const res = await axiosSecure.patch(
        `/StudentsList/${_id}`,
        studentDataToSend
      );

      if (res.data.success) {
        setStudents(
          students.map((student) =>
            student._id === _id ? editedStudent : student
          )
        );
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: res.data.message,
          confirmButtonColor: "#4f46e5",
          background: "#1F2937",
          color: "#D1D5DB",
        });
        setIsModalOpen(false);
        setCurrentStudent(null);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Could not update student data.",
        confirmButtonColor: "#4f46e5",
        background: "#1F2937",
        color: "#D1D5DB",
      });
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentStudent(null);
  };

  // Delete student
  const handleDeleteClick = (mongoId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      background: "#1F2937",
      color: "#D1D5DB",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#EC4899",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/StudentsList/${mongoId}`);
          if (res.data.success) {
            setStudents(students.filter((student) => student._id !== mongoId));
            Swal.fire({
              title: "Deleted!",
              text: res.data.message,
              icon: "success",
              background: "#1F2937",
              color: "#D1D5DB",
              confirmButtonColor: "#4f46e5",
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Deletion Failed",
            text: "Could not delete student.",
            confirmButtonColor: "#4f46e5",
            background: "#1F2937",
            color: "#D1D5DB",
          });
        }
      }
    });
  };

  // PDF download common function
  const generatePDF = async (ref, student, type) => {
    const input = ref.current[student._id];
    if (!input) return;

    const canvas = await html2canvas(input, {
      scale: 2,
      backgroundColor: "#fff",
      onclone: (clonedDoc) => {
        clonedDoc.querySelectorAll("*").forEach((el) => {
          const bg = getComputedStyle(el).backgroundColor;
          if (bg.includes("oklch")) {
            el.style.backgroundColor = "#ffffff";
          }
          const color = getComputedStyle(el).color;
          if (color.includes("oklch")) {
            el.style.color = "#000000";
          }
        });
      },
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${student.name}-${type}.pdf`);
  };

  // Loading state
  if (isInstituteDataLoading || !students) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
        <span className="loading loading-dots loading-lg text-indigo-400"></span>
      </div>
    );
  }

  const displayKeys =
    students.length > 0
      ? Object.keys(students[0]).filter(
          (key) =>
            key !== "_id" && key !== "branchId" && key !== "academicRecords"
        )
      : [];

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-7xl">
        <div className="relative rounded-2xl p-8 shadow-lg bg-gray-800 bg-opacity-90 border border-gray-700">
          <h1 className="text-2xl font-bold text-gray-100 mb-6 text-center">
            Student Information Table
          </h1>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-gray-900">
                <tr>
                  {displayKeys.map((key) => (
                    <th
                      key={key}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-700">
                {students.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-700">
                    {displayKeys.map((key) => (
                      <td key={key} className="px-6 py-4 text-gray-200">
                        {student[key]}
                      </td>
                    ))}
                    <td className="px-6 py-4 flex space-x-3 relative">
                      <button
                        onClick={() => handleEditClick(student)}
                        className="text-indigo-400 hover:text-indigo-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(student._id)}
                        className="text-pink-400 hover:text-pink-300"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() =>
                          generatePDF(admitRefs, student, "AdmitCard")
                        }
                        className="text-green-400 hover:text-green-300"
                      >
                        Admit Card
                      </button>

                      {/* <button
                        onClick={() =>
                          generatePDF(regRefs, student, "RegistrationCard")
                        }
                        className="text-green-400 hover:text-green-300"
                      >
                        Registration Card
                      </button>

                      <button
                        onClick={() =>
                          generatePDF(certRefs, student, "Certificate")
                        }
                        className="text-green-400 hover:text-green-300"
                      >
                        Certificate
                      </button> */}

                      {/* Hidden components for PDF */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "800px",
                          opacity: 0,
                          pointerEvents: "none",
                        }}
                      >
                        <AdmitCardPDF
                          ref={(el) => (admitRefs.current[student._id] = el)}
                          student={student}
                        />
                        <RegistrationCard
                          ref={(el) => (regRefs.current[student._id] = el)}
                          student={student}
                        />
                        <Certlflcate
                          ref={(el) => (certRefs.current[student._id] = el)}
                          student={student}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isModalOpen && currentStudent && (
            <EditStudentModal
              isOpen={isModalOpen}
              onClose={handleModalClose}
              studentData={currentStudent}
              onSave={handleSaveEdit}
            />
          )}
        </div>
      </div>
    </div>
  );
}
