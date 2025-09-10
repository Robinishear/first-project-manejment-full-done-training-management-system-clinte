import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../All-Page/Home/Home";

import Error from "../All-Page/Error/Error";
import BranchesList from "../All-Page/BranchesList/BranchesList";

import CourseList from "../All-Page/CourseList/CourseList";
import StudentResult from "../All-Page/StudentResult/StudentResult";
import OnlineExam from "../All-Page/OnlineExam/OnlineExam";

import Institutes from "../All-Page/Institutes/Institutes";
import PrivateRouts from "../Routs/PrivateRouts";
import Login from "../All-Page/Authintications/Login";

import Register from "../All-Page/Authintications/Register";
import DashBoardLayout from "../layouts/DashBoardLayout";
import AddCourse from "../DashBoardPages/AddCourse";

import UserProfileAndAgreement from "../DashBoardPages/Profile/UserProfileAndAgreement";
import RemoveCourses from "../DashBoardPages/RemoveCourse/RemoveCourses";
import StudentsList from "../DashBoardPages/StudentsList/StudentsList";

import ALLStudents from "../All-Page/ALLStudents/ALLStudents";

import ExamSuggestion from "../DashBoardPages/Branches-All-Page/ExamSuggestion/ExamSuggestion";
import OMRSheet from "../DashBoardPages/Branches-All-Page/OMRSheet/OMRSheet";
import UpdatePassword from "../DashBoardPages/Branches-All-Page/UpdatePassword/UpdatePassword";

import RequestedBranches from "../DashBoardPages/RequestedBranches/RequestedBranches";

import ExamQuestion from "../DashBoardPages/Branches-All-Page/ExamQuestion/ExamQuestion";
import NewStudent from "../DashBoardPages/Branches-All-Page/AllStudent/BranchStudents";
import AllStudent from "../DashBoardPages/Branches-All-Page/AllStudent/BranchStudents";

import BranchStudents from "../DashBoardPages/Branches-All-Page/AllStudent/BranchStudents";
import ADDBranches from "../DashBoardPages/ALLBranches/ADDBranches";
import AllStudents from "../DashBoardPages/AllStudents/AllStudentsDashBoardPage";

import AllStudentsDashBoardPage from "../DashBoardPages/AllStudents/AllStudentsDashBoardPage";
import FooterAdd from "../DashBoardPages/FooterAdd/FooterAdd";
import FooterList from "../DashBoardPages/FooterAdd/FooterList/FooterList";

import AdminForm from "../DashBoardPages/FooterAdd/AdminForm/AdminForm";
import SuccessStudents from "../DashBoardPages/FooterAdd/SuccessStudents/SuccessStudents";
import HomeSlider from "../DashBoardPages/FooterAdd/HomeSlider/HomeSlider";
import InfoCard from "../DashBoardPages/FooterAdd/InfoCard/InfoCard";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "CourseList",
        element: <CourseList />,
        loader: () => fetch("http://localhost:5000/numberOfCourses"),
      },
      {
        path: "Login",
        element: <Login></Login>,
      },
      {
        path: "Register",
        element: <Register></Register>,
      },
      {
        path: "BranchesList",
        element: <BranchesList />,
      },

      {
        path: "StudentResult",
        element: <StudentResult />,
      },
      {
        path: "OnlineExam",
        element: <OnlineExam />,
      },
      {
        path: "Institutes",
        element: <Institutes />,
      },
      {
        path: "ALLStudents",
        element: <ALLStudents />,
      },

      {
        path: "*",
        element: <Error />,
      },
    ],
  },
  {
    path: "/dashBoard",
    element: (
      <PrivateRouts>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRouts>
    ),
    children: [
      {
        path: "/dashBoard/addCourse",
        Component: AddCourse,
      },
      {
        path: "/dashBoard/profile",
        Component: UserProfileAndAgreement,
      },
      {
        path: "/dashBoard/removeCourses",
        Component: RemoveCourses,
      },
      {
        path: "/dashBoard/requestedBranches",
        Component: RequestedBranches,
      },
      {
        path: "/dashBoard/ExamQuestion",
        Component: ExamQuestion,
      },
      {
        path: "/dashBoard/ExamSuggestion",
        Component: ExamSuggestion,
      },
      {
        path: "/dashBoard/BranchStudents",
        Component: BranchStudents,
        loader: () => fetch("http://localhost:5000/StudentsList"),
      },
      {
        path: "/dashBoard/OMRSheet",
        Component: OMRSheet,
      },
      {
        path: "/dashBoard/UpdatePassword",
        Component: UpdatePassword,
      },
      {
        path: "/dashBoard/AddStudent",
        Component: StudentsList,
      },

      {
        path: "/dashBoard/ADDBranches",
        Component: ADDBranches,
      },
      {
        path: "/dashBoard/FooterAdd",
        Component: FooterAdd,
      },
      {
        path: "/dashBoard/FooterList",
        Component: FooterList,
      },
      {
        path: "/dashBoard/AdminForm",
        Component: AdminForm,
      },
      {
        path: "/dashBoard/SuccessStudents",
        Component: SuccessStudents,
      },
      {
        path: "/dashBoard/HomeSlider",
        Component: HomeSlider,
      },
      {
        path: "/dashBoard/InfoCard",
        Component: InfoCard,
      },
      {
        path: "/dashBoard/AllStudentsDashBoardPage",
        Component: AllStudentsDashBoardPage,
        loader: () => fetch("http://localhost:5000/StudentsList"),
      },
    ],
  },
]);

export default Router;
