import React, { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";
import axiosSecure from "../../../services/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";


export default function CourseList() {
  const navigate = useNavigate();

  const {data: courses=[],isLoading}=useQuery({
    queryKey:["courses"],
    queryFn:async()=>{
      const res =  await axiosSecure.get("/courses");
      return res.data;
    }
  })

  const handleView = async(id)=>{
        navigate(`/dashboard/courses/${id}`);
  }
  if (isLoading) {
    return <div className="text-center py-8"> <span className="loading loading-dots loading-xl"></span></div>;
  }

  return (
    <div className="overflow-x-auto w-full">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FaBook className="text-primary" /> Courses
      </h2>

      {courses.length === 0 ? (
        <div className="alert alert-warning shadow-lg">
          <span>No courses found in database!</span>
        </div>
      ) : (
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Course Code</th>
              <th>Name</th>
              <th>Credit</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c, idx) => (
              <tr key={c._id}>
                <th>{idx + 1}</th>
                <td className="font-medium">{c._id}</td>
                <td>{c.name}</td>
                <td>{c.credit}</td>
                <td>{c.department}</td>
                <td>
                  <button onClick={()=>handleView(c._id)} className="btn btn-sm btn-outline btn-primary mr-2">
                    View
                  </button>
                  <button className="btn btn-sm btn-outline btn-secondary">
                    Edit
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

