import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FaUserGraduate, FaArrowLeft } from "react-icons/fa";
import axiosSecure from "../../services/axiosSecure";


export default function StudentProfile() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axiosSecure.get(`/students/${id}`);
        setStudent(res.data);
      } catch (err) {
        console.error("Error fetching student:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Loading profile...</div>;
  }

  if (!student) {
    return (
      <div className="alert alert-error shadow-lg">
        <span>Student not found!</span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-sm btn-outline mb-4 flex items-center gap-2"
      >
        <FaArrowLeft /> Back
      </button>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title flex items-center gap-2">
            <FaUserGraduate className="text-primary" /> {student.name}
          </h2>
          <p>
            <strong>Email:</strong> {student.email}
          </p>
          <p>
            <strong>Department:</strong> {student.department}
          </p>
          <p>
            <strong>Year:</strong> {student.year}
          </p>
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary">Edit</button>
            <button className="btn btn-secondary">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

