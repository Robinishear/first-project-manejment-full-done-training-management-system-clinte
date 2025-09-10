import React from "react";
import HomeSlaider from "./HomeSlaider";
import DashboardPage from "./DashboardPage";
import SuccessStudents from "./SuccessStudents";
import SingleVideoPlayer from "./SingleVideoPlayer";
import ReactFastMarquee from "./ReactFastMarquee/ReactFastMarquee";
import InfoCard from "./InfoCard/InfoCard";
import MyDatePicker from "./MyDatePicker/MyDatePicker";
import HeroSection from "./HeroSection/HeroSection";

const Home = () => {
  return (
    <div className="bg-gray-950 text-gray-100 p-6 min-h-screen  bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950">
      <HomeSlaider />
      <ReactFastMarquee></ReactFastMarquee>
      <HeroSection />
      <DashboardPage></DashboardPage>
      <SuccessStudents></SuccessStudents>
      <InfoCard></InfoCard>
      <SingleVideoPlayer />
      <MyDatePicker />
    </div>
  );
};

export default Home;
