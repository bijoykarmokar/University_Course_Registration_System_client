import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaClipboardList } from "react-icons/fa";
import axiosSecure from "../../services/axiosSecure";


export default function RegistrationForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentRes, courseRes] = await Promise.all([
          axiosSecure.get("/students"),
          axiosSecure.get("/courses"),
        ]);
        setStudents(studentRes.data);
        setCourses(courseRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await axiosSecure.post("/registrations", data);
      alert("Registration successful!");
      reset();
    } catch (err) {
      console.error(err);
      alert("Registration failed!");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading students and courses...</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaClipboardList className="text-primary" /> New Registration
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Student */}
        <div className="form-control w-full">
          <label className="label">Select Student</label>
          <select
            className={`select select-bordered w-full ${errors.studentId && "select-error"}`}
            {...register("studentId", { required: "Student is required" })}
          >
            <option value="">-- Select Student --</option>
            {students.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name} ({s.department})
              </option>
            ))}
          </select>
          {errors.studentId && (
            <span className="text-red-500 text-sm mt-1">{errors.studentId.message}</span>
          )}
        </div>

        {/* Course */}
        <div className="form-control w-full">
          <label className="label">Select Course</label>
          <select
            className={`select select-bordered w-full ${errors.courseId && "select-error"}`}
            {...register("courseId", { required: "Course is required" })}
          >
            <option value="">-- Select Course --</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.code} - {c.name}
              </option>
            ))}
          </select>
          {errors.courseId && (
            <span className="text-red-500 text-sm mt-1">{errors.courseId.message}</span>
          )}
        </div>

        {/* Semester */}
        <div className="form-control w-full">
          <label className="label">Semester</label>
          <input
            type="text"
            placeholder="e.g., Spring 2025"
            className={`input input-bordered w-full ${errors.semester && "input-error"}`}
            {...register("semester", { required: "Semester is required" })}
          />
          {errors.semester && (
            <span className="text-red-500 text-sm mt-1">{errors.semester.message}</span>
          )}
        </div>

        {/* Year */}
        <div className="form-control w-full">
          <label className="label">Year</label>
          <input
            type="number"
            placeholder="e.g., 2025"
            className={`input input-bordered w-full ${errors.year && "input-error"}`}
            {...register("year", {
              required: "Year is required",
              min: { value: 2000, message: "Year must be >= 2000" },
              max: { value: 2100, message: "Year must be <= 2100" },
            })}
          />
          {errors.year && (
            <span className="text-red-500 text-sm mt-1">{errors.year.message}</span>
          )}
        </div>

        <button
          type="submit"
          className={`btn btn-primary w-full ${submitting ? "loading" : ""}`}
          disabled={submitting}
        >
          Register
        </button>
      </form>
    </div>
  );
}
