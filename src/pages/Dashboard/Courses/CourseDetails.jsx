import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FaBook, FaArrowLeft } from "react-icons/fa";
import axiosSecure from "../../../services/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: course, isLoading,refetch } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/courses/${id}`);
      return res.data;
    },
  });


  const handleDelete = async (id) => {
  const confirm = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (confirm.isConfirmed) {
    try {
      const res = await axiosSecure.delete(`/courses/${id}`);
       console.log("Backend Info:",res.data);
       
      if (res.data.deletedCount > 0) {
        Swal.fire({
          title: "Deleted!",
          text: "Course deleted successfully.",
          icon: "success",
        });
        refetch(); 
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while deleting!",
      });
      console.error(error.message);
    }
  }
};
  // useEffect(() => {
  //   const fetchCourse = async () => {
  //     try {
  //       const res = await axiosSecure.get(`/courses/${id}`);
  //       setCourse(res.data);
  //     } catch (err) {
  //       console.error("Error fetching course:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchCourse();
  // }, [id]);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        {" "}
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="alert alert-error shadow-lg">
        <span>Course not found!</span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title flex items-center gap-2">
            <FaBook className="text-primary" /> {course.name}
          </h2>
          <p>
            <strong>Course Code:</strong> {course.code}
          </p>
          <p>
            <strong>Credit:</strong> {course.credit}
          </p>
          <p>
            <strong>Department:</strong> {course.department}
          </p>
          <div className="card-actions md:flex-col mt-4">
            <button onClick={()=>handleDelete(course._id)} className="btn w-full btn-secondary">Delete</button>
            <button
              onClick={() => navigate(-1)}
              className="btn w-full btn-sm btn-outline mb-4 flex items-center gap-2"
            >
              <FaArrowLeft /> Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
