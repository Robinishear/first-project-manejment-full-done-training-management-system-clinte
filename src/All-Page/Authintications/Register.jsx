import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import useAuth from "./../../CustomHooks/useAuth";
import useAxiosSecure from "../../CustomHooks/useAxios";
import axios from "axios";

export default function Register() {
  const { createUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // 🔹 ImgBB API key (your working key)
  const IMGBB_API_KEY = "5175db627df59a16e4890e5f6958078a";

  // 🔹 ImgBB upload function
  const uploadImageToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("✅ ImgBB Response:", res.data);
      return res.data?.data?.url || null;
    } catch (err) {
      console.error("❌ ImgBB upload error:", err);
      return null;
    }
  };

  // 🔹 Form Submit
  const onSubmit = async (data) => {
    try {
      console.clear();

      // Firebase Auth Register
      await createUser(data.email, data.password);

      // Upload 4 images
      const directorUrl = await uploadImageToImgBB(data.directorPhoto?.[0]);
      const instituteUrl = await uploadImageToImgBB(data.institutePhoto?.[0]);
      const nationalIdUrl = await uploadImageToImgBB(data.nationalIdPhoto?.[0]);
      const signatureUrl = await uploadImageToImgBB(data.signaturePhoto?.[0]);

      // Prepare final data
      const displayData = {
        ...data,
        directorPhoto: directorUrl,
        institutePhoto: instituteUrl,
        nationalIdPhoto: nationalIdUrl,
        signaturePhoto: signatureUrl,
      };

      console.log("📤 Final Submit Data:", displayData);

      // Send to backend
      await axiosSecure.post("/allBranches", displayData);

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Your registration form has been submitted!",
        confirmButtonColor: "#4f46e5",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        <div className="relative rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg hover:shadow-indigo-500/70 transition-all duration-300 bg-gray-800 bg-opacity-80 backdrop-blur-sm border border-gray-700">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-100">
              Branch Registration
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">
              Fill the form below to register
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6"
          >
            {/* Text Inputs */}
            {[
              { id: "instituteName", label: "Institute Name" },
              { id: "directorName", label: "Director Name" },
              { id: "fatherName", label: "Father's Name" },
              { id: "motherName", label: "Mother's Name" },
              { id: "email", label: "Email", type: "email" },
              { id: "mobileNumber", label: "Mobile Number" },
              { id: "address", label: "Address" },
              { id: "postOffice", label: "Post Office" },
              { id: "upazila", label: "Upazila" },
              { id: "district", label: "District" },
              { id: "username", label: "Username" },
              { id: "password", label: "Password", type: "password" },
            ].map((field) => (
              <div key={field.id} className="col-span-1">
                <label className="block text-xs sm:text-sm text-gray-300 mb-1 sm:mb-2 font-medium">
                  {field.label}
                </label>
                <input
                  type={field.type || "text"}
                  placeholder={field.label}
                  {...register(field.id, {
                    required: "This field is required",
                  })}
                  className={`w-full rounded-lg sm:rounded-xl bg-gray-900 text-gray-100 border px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                    errors[field.id] ? "border-pink-500" : "border-gray-700"
                  }`}
                />
                {errors[field.id] && (
                  <p className="mt-1 text-xs text-pink-400">
                    {errors[field.id]?.message}
                  </p>
                )}
              </div>
            ))}

            {/* File Inputs */}
            {[
              { id: "directorPhoto", label: "Director Photo" },
              { id: "institutePhoto", label: "Institute Photo" },
              { id: "nationalIdPhoto", label: "National ID Photo" },
              { id: "signaturePhoto", label: "Signature Photo" },
            ].map((file) => (
              <div key={file.id} className="col-span-1">
                <label className="block text-xs sm:text-sm text-gray-300 mb-1 sm:mb-2 font-medium">
                  {file.label}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  {...register(file.id, { required: "This field is required" })}
                  className={`w-full text-xs sm:text-sm text-gray-300 border rounded-lg sm:rounded-xl px-2 sm:px-3 py-2 bg-gray-900 cursor-pointer
                    file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4
                    file:rounded-full file:border-0
                    file:text-xs sm:file:text-sm file:font-semibold
                    file:bg-indigo-600 file:text-gray-100
                    hover:file:bg-indigo-700 transition-colors
                    ${errors[file.id] ? "border-pink-500" : "border-gray-700"}`}
                />
                {errors[file.id] && (
                  <p className="mt-1 text-xs text-pink-400">
                    {errors[file.id]?.message}
                  </p>
                )}
              </div>
            ))}

            {/* Submit Button */}
            <div className="col-span-1 md:col-span-2 mt-4 sm:mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg sm:rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 sm:py-3 text-sm sm:text-base transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-xs sm:text-sm text-gray-400">
              Already have an account?{" "}
              <NavLink 
                to="/Login" 
                className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors duration-200 font-medium"
              >
                Sign in
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}