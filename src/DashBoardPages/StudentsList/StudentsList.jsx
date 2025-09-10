import React, { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosSecure from "../../CustomHooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../CustomHooks/useAuth";
import { uploadImageToImgBB } from "../../util/util";

const sampleDistricts = [
  { name: "Dhaka", thanas: ["Dhanmondi", "Gulshan", "Mirpur"] },
  { name: "Chattogram", thanas: ["Pahartali", "Kotwali", "Panchlaish"] },
  { name: "Khulna", thanas: ["Khalishpur", "Sonadanga"] },
];

const sampleCourses = [
  "Web Development",
  "Graphic Design",
  "Mobile App Development",
  "Electrician",
  "Plumbing",
];
const sampleDurations = ["1 month", "3 months", "6 months", "1 year"];

const sampleMonths = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "July", "Aug", "Sept", "Oct", "Nov", "Dec",
];
const sampleYears = ["2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"];

const sampleQualifications = ["No formal", "SSC", "HSC", "Diploma", "Graduate"];

export default function StudentForm() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const currentUserEmail = user?.email;
  const [thanaOptions, setThanaOptions] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    dob: "",
    gender: "Male",
    passport: "",
    guardianPhone: "",
    studentAddress: "",
    district: "",
    thana: "",
    searchCourse: "",
    duration: "",
    year1: "",
    month1: "",
    year2: "",
    month2: "",
    educationQualification: "",
    institute: "Technical Training centre",
    picture: null,
    issueDate: "",
    expireDate: "",
  });

  const { data: instituteData } = useQuery({
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

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (files) {
      setFormData((p) => ({ ...p, [id]: files[0] }));
    } else {
      setFormData((p) => ({ ...p, [id]: value }));
      if (id === "district") {
        const found = sampleDistricts.find((d) => d.name === value);
        setThanaOptions(found ? found.thanas : []);
        setFormData((p) => ({ ...p, thana: "" }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        ...formData,
        branchId: branchId || "",
      };

      console.log("Payload sending:", payload);

      const res = await fetch("http://localhost:5000/StudentsList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Server response:", data);

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Student information saved successfully!",
          confirmButtonColor: "#4f46e5",
          background: "#1F2937",
          color: "#D1D5DB",
        });
        setFormData({
          studentName: "",
          fatherName: "",
          motherName: "",
          dob: "",
          gender: "Male",
          passport: "",
          guardianPhone: "",
          studentAddress: "",
          district: "",
          thana: "",
          searchCourse: "",
          duration: "",
          year1: "",
          month1: "",
          year2: "",
          month2: "",
          educationQualification: "",
          institute: "Technical Training centre",
          picture: null,
          issueDate: "",
          expireDate: "",
        });
        setUploadedImageUrl("");
        setThanaOptions([]);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Failed to save student",
          confirmButtonColor: "#4f46e5",
          background: "#1F2937",
          color: "#D1D5DB",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error submitting form",
        confirmButtonColor: "#4f46e5",
        background: "#1F2937",
        color: "#D1D5DB",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const inputClass =
    "w-full rounded-xl bg-gray-900 text-gray-100 border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition border-gray-700";
  const labelClass = "block text-sm text-gray-300 mb-1";
  const fileInputClass = `w-full text-sm text-gray-300 border rounded-xl px-3 py-2 bg-gray-900 cursor-pointer
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-indigo-600 file:text-gray-100
                          hover:file:bg-indigo-700 transition-colors
                          border-gray-700`;

  const handleChangePhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSubmitting(true);
    setUploadedImageUrl("");

    try {
      let imageUrl = "";
      if (file) {
        imageUrl = await uploadImageToImgBB(file);
        setUploadedImageUrl(imageUrl);
        setFormData((p) => ({ ...p, picture: imageUrl }));
        Swal.fire({
          icon: "success",
          title: "Image Uploaded",
          text: "Image has been successfully uploaded!",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          background: "#1F2937",
          color: "#D1D5DB",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while uploading the image.",
        background: "#1F2937",
        color: "#D1D5DB",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 min-h-screen flex items-center justify-center p-10">
      <div className="w-full max-w-7xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative rounded-2xl px-10 py-10 shadow-lg hover:shadow-indigo-500/70 transition bg-gray-800 bg-opacity-80 backdrop-blur-sm p-8 border border-gray-700"
        >
          <h1 className="text-2xl font-bold text-gray-100 text-center">
            Student Registration
          </h1>
          <p className="text-sm text-gray-400 text-center mt-1 mb-6">
            Fill the form below to register a new student
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1 */}
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div variants={itemVariants}>
                <label className={labelClass}>Student Name</label>
                <input
                  id="studentName"
                  className={inputClass}
                  value={formData.studentName}
                  onChange={handleChange}
                  required
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label className={labelClass}>Father's Name</label>
                <input
                  id="fatherName"
                  className={inputClass}
                  value={formData.fatherName}
                  onChange={handleChange}
                />
              </motion.div>
            </div>
            {/* Row 2 */}
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div variants={itemVariants}>
                <label className={labelClass}>Mother's Name</label>
                <input
                  id="motherName"
                  className={inputClass}
                  value={formData.motherName}
                  onChange={handleChange}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label className={labelClass}>Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  className={inputClass}
                  value={formData.dob}
                  onChange={handleChange}
                />
              </motion.div>
            </div>
            {/* Row 3 */}
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div variants={itemVariants}>
                <label className={labelClass}>Gender</label>
                <select
                  id="gender"
                  className={inputClass}
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </motion.div>
              <motion.div variants={itemVariants}>
                <label className={labelClass}>Passport/NID</label>
                <input
                  id="passport"
                  className={inputClass}
                  value={formData.passport}
                  onChange={handleChange}
                />
              </motion.div>
            </div>
            {/* Row 4 */}
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div variants={itemVariants}>
                <label className={labelClass}>Guardian Phone</label>
                <input
                  id="guardianPhone"
                  className={inputClass}
                  value={formData.guardianPhone}
                  onChange={handleChange}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label className={labelClass}>Student Address</label>
                <input
                  id="studentAddress"
                  className={inputClass}
                  value={formData.studentAddress}
                  onChange={handleChange}
                />
              </motion.div>
            </div>
            {/* Row 5 */}
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div variants={itemVariants}>
                <label className={labelClass}>District</label>
                <select
                  id="district"
                  className={inputClass}
                  value={formData.district}
                  onChange={handleChange}
                >
                  <option value="">Select District</option>
                  {sampleDistricts.map((d) => (
                    <option key={d.name}>{d.name}</option>
                  ))}
                </select>
              </motion.div>
              <motion.div variants={itemVariants}>
                <label className={labelClass}>Thana</label>
                <select
                  id="thana"
                  className={inputClass}
                  value={formData.thana}
                  onChange={handleChange}
                >
                  <option value="">Select Thana</option>
                  {thanaOptions.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </motion.div>
            </div>
            {/* Row 6 */}
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div variants={itemVariants}>
                <label className={labelClass}>Course</label>
                <select
                  id="searchCourse"
                  className={inputClass}
                  value={formData.searchCourse}
                  onChange={handleChange}
                >
                  <option value="">Select Course</option>
                  {sampleCourses.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </motion.div>
              <motion.div variants={itemVariants}>
                <label className={labelClass}>Duration</label>
                <select
                  id="duration"
                  className={inputClass}
                  value={formData.duration}
                  onChange={handleChange}
                >
                  <option value="">Select Duration</option>
                  {sampleDurations.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </motion.div>
            </div>
            {/* Row 7 - New Session Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Year 1 and Month 1 */}
              <div className="grid md:grid-cols-2 gap-4">
                <motion.div variants={itemVariants}>
                  <label className={labelClass}>Start Year</label>
                  <select
                    id="year1"
                    className={inputClass}
                    value={formData.year1}
                    onChange={handleChange}
                  >
                    <option value="">Select Year</option>
                    {sampleYears.map((y) => (
                      <option key={y}>{y}</option>
                    ))}
                  </select>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label className={labelClass}>Start Month</label>
                  <select
                    id="month1"
                    className={inputClass}
                    value={formData.month1}
                    onChange={handleChange}
                    disabled={!formData.year1}
                  >
                    <option value="">Select Month</option>
                    {sampleMonths.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </motion.div>
              </div>

              {/* Year 2 and Month 2 */}
              <div className="grid md:grid-cols-2 gap-4">
                <motion.div variants={itemVariants}>
                  <label className={labelClass}>End Year</label>
                  <select
                    id="year2"
                    className={inputClass}
                    value={formData.year2}
                    onChange={handleChange}
                  >
                    <option value="">Select Year</option>
                    {sampleYears.map((y) => (
                      <option key={y}>{y}</option>
                    ))}
                  </select>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label className={labelClass}>End Month</label>
                  <select
                    id="month2"
                    className={inputClass}
                    value={formData.month2}
                    onChange={handleChange}
                    disabled={!formData.year2}
                  >
                    <option value="">Select Month</option>
                    {sampleMonths.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </motion.div>
              </div>
            </div>
            {/* Row 8 */}
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div variants={itemVariants}>
                <label className={labelClass}>Education Qualification</label>
                <select
                  id="educationQualification"
                  className={inputClass}
                  value={formData.educationQualification}
                  onChange={handleChange}
                >
                  <option value="">Select Qualification</option>
                  {sampleQualifications.map((q) => (
                    <option key={q}>{q}</option>
                  ))}
                </select>
              </motion.div>
              <motion.div variants={itemVariants}>
                <label className={labelClass}>Institute</label>
                <input
                  id="institute"
                  className={inputClass}
                  value={formData.institute}
                  onChange={handleChange}
                />
              </motion.div>
            </div>
            {/* Row 9 */}
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div variants={itemVariants}>
                <label className={labelClass}>Picture</label>
                <input
                  type="file"
                  id="picture"
                  accept="image/*"
                  className={fileInputClass}
                  onChange={handleChangePhoto}
                />
                {uploadedImageUrl && (
                  <img
                    src={uploadedImageUrl}
                    alt="Preview"
                    className="mt-2 w-24 h-24 object-cover rounded-full border"
                  />
                )}
              </motion.div>
              <motion.div variants={itemVariants}>
                <label className={labelClass}>Issue Date</label>
                <input
                  type="date"
                  id="issueDate"
                  className={inputClass}
                  value={formData.issueDate}
                  onChange={handleChange}
                />
              </motion.div>
            </div>
            {/* Row 10 */}
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div variants={itemVariants}>
                <label className={labelClass}>Expire Date</label>
                <input
                  type="date"
                  id="expireDate"
                  className={inputClass}
                  value={formData.expireDate}
                  onChange={handleChange}
                />
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="text-center pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold shadow hover:bg-indigo-700 disabled:opacity-50 transition"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}