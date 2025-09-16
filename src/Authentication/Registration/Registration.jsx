import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import SocialLogIn from "../../components/SocialLogIn";
import axios from "axios";
import useAxios from "../../services/useAxios";
import toast from "react-hot-toast";

const Registration = () => {
  const { createUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from || "/";
  const [profilePicture, setProfilePicture] = useState("");
  const axiosInstance = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // 1️⃣ Create user in Firebase Auth
      const result = await createUser(data.email, data.password);
      const user = result.user;

      // 2️⃣ Send user info to backend (MongoDB)
      const userInfo = {
        email: user.email,
        role: "user",
        created_at: new Date().toISOString(),
        last_signIn_at: new Date().toISOString(),
      };

      const userRes = await axiosInstance.post("/users", userInfo);
      // console.log("Backend response:", userRes.data);

      if(userRes.data.insertedId){
        toast.success("Your Register has successfully")
      }

      // 3️⃣ Update Firebase user profile
      const userProfile = {
        displayName: data.name,
        photoURL: profilePicture, 
      };

      await updateUserProfile(userProfile);
      toast.success("Profile updated successfully");

      navigate(from); 
      reset(); 

    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  const handleUploadPhoto = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    try {
      const imageUploadURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD}`;
      const res = await axios.post(imageUploadURL, formData);
      setProfilePicture(res.data.data.display_url);
      // console.log("Uploaded image URL:", res.data.data.display_url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      // console.error("Image upload failed:", error.message);
       toast.error("Image upload failed: " + error.message);
    }
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
                type="text"
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

              <label className="label">Upload Your Photo</label>
              <input
                onChange={handleUploadPhoto}
                type="file"
                className="input"
                placeholder="Photo"
              />

              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500">Email is required</p>
              )}

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
                  Password must be at least 6 characters
                </p>
              )}

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button state={{from}} className="btn btn-neutral mt-4">Register</button>
              <p>
                Already have an account.
                <NavLink className="btn btn-link -ms-3" to="/logIn">
                  SignIn
                </NavLink>
              </p>
            </fieldset>
          </form>
          <div className="divider">OR</div>
          <SocialLogIn />
        </div>
      </div>
    </div>
  );
};

export default Registration;
