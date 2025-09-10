import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router";
import { PDFDownloadLink } from "@react-pdf/renderer";
import useAxiosSecure from "../../CustomHooks/useAxios";
import EditStudentModalDashBoard from "./EditStudentModalDashBoard";
import AdmitCardPDF from "../Branches-All-Page/AllStudent/AdmitCardPDF";
import RegistrationCard from "../Branches-All-Page/AllStudent/RegistrationCard";
import Certlflcate from "../Branches-All-Page/AllStudent/Certlflcate";
import UpdateGradeModal from "./UpdateGradeModal";

export default function AllStudentsDashBoardPage() {
  const initialStudents = useLoaderData();
  const [students, setStudents] = useState(initialStudents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const[updategrademodal,setUpdateGradeModal]=useState(false);
  const axiosSecure = useAxiosSecure();
  const [userId,setUserId]=useState()


// update grade

const handleUpdateGrade=(id)=>{
   setUserId(id);
  setUpdateGradeModal(true);
}


// handle click
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

      // console.log(studentDataToSend)

      

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
            const updatedStudents = students.filter(
              (student) => student._id !== mongoId
            );
            setStudents(updatedStudents);
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

  // Corrected line to exclude academicRecords
  const displayKeys =
    students.length > 0
      ? Object.keys(students[0]).filter(
          (key) =>
            key !== "_id" &&
            key !== "branchId" &&
            key !== "academicRecords" &&
            key != "subjects" &&
            key !== "fullMark" &&
            key !== "vivaMarks" &&
            key !== "writtenMarks" &&
            key !== "practicalMark" &&
            key !== "letterGrade" &&
            key !== "cgpa"
        )
      : [];

  return (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 min-h-screen flex flex-col items-center ">
      <div className="w-full ">
        <div className="relative rounded-2xl p-8 shadow-lg bg-gray-800 bg-opacity-80 backdrop-blur-sm border border-gray-700">
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider text-nowrap">
                    ID Card
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {students.map((student) => (
                  <tr key={student._id}>
                    {displayKeys.map((key, index) => (
                      <td
                        key={index}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                      >
                        {student[key]}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                      <button
                        onClick={() => handleEditClick(student)}
                        className="text-indigo-400 hover:text-indigo-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(student._id)}
                        className="text-red-400 hover:text-pink-600 transition"
                      >
                        Delete
                      </button>
                      <button onClick={()=>handleUpdateGrade(student._id)} className="text-green-500">update</button>
                      {/* PDF Download Link */}
                    </td>

                    <td>
                      <AdmitCardPDF student={student}></AdmitCardPDF>
                    </td>
                    <td>
                      <RegistrationCard student={student}></RegistrationCard>
                    </td>

                    <td>
                      <Certlflcate student={student}></Certlflcate>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && currentStudent && (
        <EditStudentModalDashBoard
          isOpen={isModalOpen}
          onClose={handleModalClose}
          studentData={currentStudent}
          onSave={handleSaveEdit}
        />
      )}

      {/* update grade  */}

      {
        updategrademodal&& <UpdateGradeModal
        userId={userId}
        setUpdateGradeModal={setUpdateGradeModal}
        ></UpdateGradeModal>
      }
    </div>
  );
}