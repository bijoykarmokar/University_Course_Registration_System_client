import { createBrowserRouter } from 'react-router';
import MainLayouts from './../LayOuts/MainLayouts';
import Home from './../pages/Home/Home';
import AuthLayout from './../LayOuts/AuthLayout';
import LogIn from './../Authentication/LogIn/LogIn';
import Registration from '../Authentication/Registration/Registration';
import PrivateRoute from './../Route/PrivateRoute';
import DashBoardLayout from '../LayOuts/DashBoardLayout';
import StudentList from '../pages/Dashboard/Students/StudentList';
import StudentProfile from '../pages/Dashboard/Students/StudentProfile';
import RegistrationForm from '../pages/form/RegistrationForm';
import Students from '../pages/form/StudentsForm';
import CourseRegistrationForm from '../pages/form/CourseRegistrationForm';
import CourseDetails from '../pages/Dashboard/Courses/CourseDetails';
import CourseList from '../pages/Dashboard/Courses/CourseList';
import AdvisorForm from '../pages/form/AdvisorForm';
import AdvisorList from '../pages/Dashboard/Advisors/AdvisorList';
import DepartmentForm from '../pages/form/DepartmentForm';
import DepartmentList from './../pages/Dashboard/Departments/DepartmentList';
import RegistrationList from '../pages/Dashboard/Registrations/RegistrationList';
import TimeTableForm from '../pages/form/TimeTableForm';



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
      },
      {
        path:"coursesForm",
        element:<CourseRegistrationForm></CourseRegistrationForm>
      },
      {
        path:"advisorsForm",
        element:<AdvisorForm></AdvisorForm>
      },
      {
        path:"departmentForm",
        element:<DepartmentForm></DepartmentForm>
      },
      {
        path:"timetables",
        element:<TimeTableForm></TimeTableForm>
      },
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
      {
        path:"courses",
        element:<CourseList></CourseList>
      },
      {
        path:"courses/:id",
        element:<CourseDetails></CourseDetails>
      },
      {
        path:"advisors",
        element:<AdvisorList></AdvisorList>
      },
      {
        path:"departments",
        element:<DepartmentList></DepartmentList>
      },
      {
        path:'registrations',
        element:<RegistrationList></RegistrationList>
      },
      {
        path:"timetables",
        element:<TimeTableForm></TimeTableForm>
      },
      // {
      //   path:"grades",
      //   element:<GradeForm></GradeForm>
      // },
    
      // {
      //   path:"users",
      //   element:<UserList></UserList>
      // }
    ]
  }
])

export default router;