import React, { useEffect, useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import axiosSecure from "../../../services/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function StudentList() {
  const navigate = useNavigate();
  const {
    data: students = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const res = await axiosSecure.get("/students");
      return res.data;
    },
  });

  // Profile student
  const viewProfile = async (id) => {
     navigate(`/dashboard/students/${id}`)
  };

  // Delete student
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
      const res = await axiosSecure.delete(`/students/${id}`);

      if (res.data.deletedCount > 0) {
        Swal.fire({
          title: "Deleted!",
          text: "Student deleted successfully.",
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


  if (isLoading) {
    return (
      <div className="text-center py-8">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FaUserGraduate className="text-primary" /> Students
      </h2>

      {students.length === 0 ? (
        <div className="alert alert-warning shadow-lg">
          <span>No students found in database!</span>
        </div>
      ) : (
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Year</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, idx) => (
              <tr key={s._id}>
                <th>{idx + 1}</th>
                <td className="font-medium">{s.name}</td>
                <td>{s.email}</td>
                <td>{s.department_id}</td>
                <td>{s.year}</td>
                <td>
                  <button onClick={()=>viewProfile(s._id)} className="btn btn-sm btn-outline btn-primary mr-2">
                    View
                  </button>
                  <button
                    onClick={()=>handleDelete(s._id)}
                    className="btn btn-sm btn-outline btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
