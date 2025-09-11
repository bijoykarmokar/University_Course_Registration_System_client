import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FaBook, FaArrowLeft } from "react-icons/fa";
import axiosSecure from "../../services/axiosSecure";


export default function CourseDetails() {
  const { id } = useParams(); // URL থেকে course ID
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axiosSecure.get(`/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Loading course details...</div>;
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
      <button
        onClick={() => navigate(-1)}
        className="btn btn-sm btn-outline mb-4 flex items-center gap-2"
      >
        <FaArrowLeft /> Back
      </button>

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
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary">Edit</button>
            <button className="btn btn-secondary">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

