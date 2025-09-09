import { createBrowserRouter } from "react-router";
import MainLayouts from "../LayOuts/MainLayouts";
import Home from "../pages/Home/Home";
import AuthLayout from "../LayOuts/AuthLayout";
import LogIn from "../Authentication/LogIn/LogIn";
import Students from "../components/Students";
import Courses from "../components/Courses";
import Register from "../components/Register";
import Registration from './../Authentication/Registration/Registration';



const router = createBrowserRouter([
    {
        path:'/',
        Component:MainLayouts,
        children:[
            {
                index:true,
                Component:Home
            },
            {
              path:"students",
              Component:Students
            },
            {
                path:"courses",
                Component: Courses,
            },
            {
                path:"register",
                Component:Register
            }
        ]
    },
    {
        path:"/",
        Component:AuthLayout,
        children:[
            {
                path:"logIn",
                Component:LogIn
            },
            {
              path:"signUp",
              Component:Registration
            }
        ]
    }
])
export default router;