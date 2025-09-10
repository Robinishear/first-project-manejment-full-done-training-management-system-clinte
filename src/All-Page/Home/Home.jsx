import React from "react";
import HomeSlaider from "./HomeSlaider";
import CourseInfo from "./CourseInfo";
import DashboardPage from "./DashboardPage";
import SuccessStudents from "./SuccessStudents";
import SingleVideoPlayer from "./SingleVideoPlayer";



const Home = () => {
  return (
    <div className="bg-gray-950 text-gray-100 p-6 min-h-screen  bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950">
      <HomeSlaider />
      <CourseInfo></CourseInfo>
      <DashboardPage></DashboardPage>
      <SuccessStudents></SuccessStudents>
      <SingleVideoPlayer />
   
    
    </div>
  );
};

export default Home;
