import { motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import SocialLogIn from "../../components/SocialLogIn";

const Registration = () => {
  const {createUser} = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const onSubmit = (data) => {
     createUser(data.email,data.password)
     .then((result)=>{
       console.log(result.user);
       reset();
     }).catch(error=>{
      console.log(error.message);
     })
   navigate("/");
  };
  return (
    <div>
      <h2 className="text-2xl md:text-4xl lg:text-5xl mb-5 font-bold">
        Create an Account!
      </h2>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                type="name"
                {...register("name", { required: true, minLength: 5 })}
                className="input"
                placeholder="Name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Name is required</p>
              )}
              {errors.name?.type === "minLength" && (
                <p className="text-red-500">
                  Name must be greater than five characters
                </p>
              )}

              <label className="label">Email</label>
              <input
                type="email"
                {...register("email")}
                className="input"
                placeholder="Email"
              />
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className="input"
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  password must be greater than six characters or number
                </p>
              )}
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Register</button>
              <p>
                Already have an account.
                <NavLink className="btn btn-link -ms-3" to="/logIn">
                  SignIn
                </NavLink>
              </p>
            </fieldset>
          </form>
          <div className="divider">OR</div>
          <SocialLogIn></SocialLogIn>
        </div>
      </div>
    </div>
  );
};

export default Registration;
