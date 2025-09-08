import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import SocialLogIn from "../../components/SocialLogIn";

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <h2 className="text-2xl md:text-4xl lg:text-5xl mb-5 font-bold">
        LogIn Now
      </h2>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input type="email" {...register("email")} className="input" placeholder="Email" />
              <label className="label">Password</label>
              <input type="password" {...register("password",{required : true,minLength:6})} className="input" placeholder="Password" />
              {
                errors.password?.type === "required" && <p className="text-red-500">Password is required</p>
              }
              {
                errors.password?.type === "minLength" && <p className="text-red-500">Password must be greater than 6 characters</p>
              }
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
              <p>
                Don't have an any account.
                <NavLink className="btn btn-link -ms-3" to="/signUp">
                  SignUp
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

export default LogIn;
