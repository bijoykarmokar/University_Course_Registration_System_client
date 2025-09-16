// import { createBrowserRouter } from "react-router"; 
// import MainLayouts from "../LayOuts/MainLayouts";
// import AuthLayout from "../LayOuts/AuthLayout";
// import PrivateRoute from "../Route/PrivateRoute";


// // Pages / Components
// import Home from "../pages/Home/Home";
// import LogIn from "../Authentication/LogIn/LogIn";
// import Registration from "../Authentication/Registration/Registration";


// // Admin Components
// import AdminDashboard from "../pages/Dashboard/AdminDashboard";
// import Students from "../pages/Students/StudentList";
// import Courses from "../pages/Courses/CourseList";
// import Register from "../pages/Registrations/RegistrationForm";
// import Advisors from "../pages/Advisors/AdvisorList";
// import Departments from "../pages/Departments/DepartmentList";
// import TimeTables from "../pages/TimeTables/TimeTable";
// import Grades from "../pages/Grades/GradeList";
// import Users from "../pages/Users/UserList";

// // Student Components
// import StudentDashboard from "../pages/Dashboard/StudentDashboard";

// // Advisor Components
// import AdvisorDashboard from "../pages/Dashboard/AdvisorDashboard";
// import { ROLES } from "../Utils/roles.js";
// import Unauthorized from "../pages/Unauthorized/Unauthorized";
import { createBrowserRouter } from 'react-router';
import MainLayouts from './../LayOuts/MainLayouts';
import Home from './../pages/Home/Home';
// import RegistrationForm from './../pages/Registrations/RegistrationForm';
// import GradeForm from './../pages/Grades/GradeForm';
import AuthLayout from './../LayOuts/AuthLayout';
import LogIn from './../Authentication/LogIn/LogIn';
import Registration from '../Authentication/Registration/Registration';
// import AdvisorList from './../pages/Advisors/AdvisorList';
// import DepartmentList from './../pages/Departments/DepartmentList';
// import TimeTable from './../pages/TimeTables/TimeTable';
// import UserList from './../pages/Users/UserList';
// import CourseList from './../pages/Courses/CourseList';
import PrivateRoute from './../Route/PrivateRoute';
import DashBoardLayout from '../LayOuts/DashBoardLayout';
import StudentList from '../pages/Dashboard/Students/StudentList';
import StudentProfile from '../pages/Dashboard/Students/StudentProfile';
import RegistrationForm from './../pages/Registrations/RegistrationForm';
import Students from '../pages/form/StudentsForm';




// const router = createBrowserRouter([
//   {
//     path: "/",
//     Component: MainLayouts,
//     children: [
//       { index: true, Component: Home },

     
//       {
//         path: "admin/dashboard",
//         Component: () => (
//           <PrivateRoute allowedRoles={[ROLES.ADMIN]}>
//             <AdminDashboard />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "students",
//         Component: () => (
//           <PrivateRoute allowedRoles={[ROLES.ADMIN]}>
//             <Students />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "courses",
//         Component: () => (
//           <PrivateRoute allowedRoles={[ROLES.ADMIN]}>
//             <Courses />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "registrations",
//         Component: () => (
//           <PrivateRoute allowedRoles={[ROLES.ADMIN]}>
//             <Register />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "advisors",
//         Component: () => (
//           <PrivateRoute allowedRoles={[ROLES.ADMIN]}>
//             <Advisors />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "departments",
//         Component: () => (
//           <PrivateRoute allowedRoles={[ROLES.ADMIN]}>
//             <Departments />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "timetables",
//         Component: () => (
//           <PrivateRoute allowedRoles={[ROLES.ADMIN]}>
//             <TimeTables />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "grades",
//         Component: () => (
//           <PrivateRoute allowedRoles={[ROLES.ADMIN]}>
//             <Grades />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "users",
//         Component: () => (
//           <PrivateRoute allowedRoles={[ROLES.ADMIN]}>
//             <Users />
//           </PrivateRoute>
//         ),
//       },

//       // Student routes
//       {
//         path: "student/dashboard",
//         Component: () => (
//           <PrivateRoute allowedRoles={[ROLES.STUDENT]}>
//             <StudentDashboard
//               studentId={JSON.parse(localStorage.getItem("user"))?._id}
//             />
//           </PrivateRoute>
//         ),
//       },

//       // Advisor routes
//       {
//         path: "advisor/dashboard",
//         Component: () => (
//           <PrivateRoute allowedRoles={[ROLES.ADVISOR]}>
//             <AdvisorDashboard
//               advisorId={JSON.parse(localStorage.getItem("user"))?._id}
//             />
//           </PrivateRoute>
//         ),
//       },

//       // Unauthorized page
//       { 
//         path: "unauthorized",
//          Component: Unauthorized
//         },
//     ],
//   },

//   {
//     path: "/",
//     Component: AuthLayout,
//     children: [
//       { path: "login", Component: LogIn },
//       { path: "signup", Component: Registration },
//     ],
//   },
// ]);

// export default router;


const router = createBrowserRouter([
  {
     path:"/",
     Component: MainLayouts,
     children:[
      {
        index:true,
        Component:Home
      },
       {
        path:"registrations",
        element:<RegistrationForm></RegistrationForm>
      },
      {
        path:"studentsForm",
        Component:Students
      }
     ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      { 
        path: "login", 
        Component: LogIn 
      },
      { 
        path: "signup",
         Component: Registration
      },
    ],
  },
  {
    path:'/dashboard',
    element:<PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
    children:[
       {
        path:"students",
        element:<StudentList></StudentList>
      },
       {
        path:"students/:id",
        element:<StudentProfile></StudentProfile>
      },
      // {
      //   path:"courses",
      //   element:<CourseList></CourseList>
      // },
      // {
      //   path:"departments",
      //   element:<DepartmentList></DepartmentList>
      // },
      // {
      //   path:"grades",
      //   element:<GradeForm></GradeForm>
      // },
    
      // {
      //   path:"timetables",
      //   element:<TimeTable></TimeTable>
      // },
      // {
      //   path:"users",
      //   element:<UserList></UserList>
      // }
    ]
  }
])

export default router;