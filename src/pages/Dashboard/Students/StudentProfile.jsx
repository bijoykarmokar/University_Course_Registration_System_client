import React from "react";
import { useNavigate, useParams } from "react-router";
import { FaUserGraduate, FaArrowLeft } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../services/axiosSecure";

export default function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: student, isLoading } = useQuery({
    queryKey: ["student", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/students/${id}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="text-center py-8">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );

  if (!student)
    return (
      <div className="alert alert-warning shadow-lg">
        Student profile not found!
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title flex items-center space-y-5 gap-2">
            <FaUserGraduate className="text-primary" /> {student.name}
          </h2>
          <p>
            <strong>Email:</strong> {student.email}
          </p>
          <p>
            <strong>Department:</strong> {student.department_id}
          </p>
          <p>
            <strong>Year:</strong> {student.semester}
          </p>

          <button className="btn btn-sm btn-outline btn-secondary mr-2">
            Edit
          </button>

          <button
            onClick={() => navigate(-1)}
            className="btn btn-sm btn-outline mb-4 flex items-center gap-2"
          >
            <FaArrowLeft /> Back
          </button>
        </div>
      </div>
    </div>
  );
}
