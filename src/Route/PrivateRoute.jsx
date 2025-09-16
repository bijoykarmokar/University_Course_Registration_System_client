import React from 'react'
import useAuth from './../hooks/useAuth';
import { useNavigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth();
    const navigate = useNavigate(); 

    if(loading){
        return <span className="loading loading-dots loading-xl"></span>
    }
    if(!user){
        return navigate("/");
    }
  return children;
}

export default PrivateRoute;
