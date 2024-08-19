import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Wrapper from "./components/common/Wrapper";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import TeacherList from "./components/teacher/TeacherList";
import StudentList from "./components/student/StudentList";
import ErrorPage from "./pages/Error";
import ApplicationForm from "./components/student/ApplicationForm";
import Academic from "./pages/Academic";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/teacher-list",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <TeacherList />,
      },
    ],
  },
  {
    path: "/student-list",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <StudentList />,
      },
    ],
  },
  {
    path: "/application-form",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <ApplicationForm />,
      },
    ],
  },
  {
    path: "/user-profile",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "/academic",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <Academic />,
      },
    ],
  },
  
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
function Routes() {
  return <RouterProvider router={router} />;
}

export default Routes;
