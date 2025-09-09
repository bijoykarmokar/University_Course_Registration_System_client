import React from 'react'
import useAuth from './../hooks/useAuth';
import { useNavigate } from 'react-router';

const PrivateRoute = ({childern}) => {
    const {user,loading} = useAuth();
    const navigate = useNavigate();

    if(loading){
        return <span className="loading loading-dots loading-xl"></span>
    }
    if(!user){
        return navigate("/");
    }
  return childern;
}

export default PrivateRoute;
