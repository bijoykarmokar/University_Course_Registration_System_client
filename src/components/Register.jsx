import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axiosSecure from "../services/axiosSecure";

const Register = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [registration, setRegistration] = useState(null);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    axiosSecure.get("/students").then(res => setStudents(res.data));
    axiosSecure.get("/courses").then(res => setCourses(res.data));
  }, []);

  const onSubmit = data => {
    const student_id = data.student_id;
    const selectedCourses = Object.keys(data).filter(k => k.startsWith("course_") && data[k]);
    axiosSecure.post("/registrations/register", { student_id, courses: selectedCourses })
      .then(res => {
        setRegistration(res.data);
        alert("Courses registered!");
      })
      .catch(err => alert(err.response?.data?.error || "Registration failed"));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Course Registration</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <select {...register("student_id")} className="select select-bordered w-full max-w-xs" required>
          <option value="">Select Student</option>
          {students.map(s => (
            <option key={s._id} value={s._id}>{s.name} ({s._id})</option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-2">
          {courses.map(c => (
            <label key={c._id} className="flex items-center gap-2">
              <input type="checkbox" {...register(`course_${c._id}`)} className="checkbox" />
              {c.name} ({c.credit} cr)
            </label>
          ))}
        </div>

        <button type="submit" className="btn btn-primary w-40 mt-3">Register</button>
      </form>

      {registration && (
        <div className="mt-6 p-4 border rounded bg-base-100">
          <h3 className="font-bold">Registration Summary</h3>
          <p>Student: {registration.registration?.student_id}</p>
          <p>Courses: {registration.registration?.courses?.join(", ")}</p>
          <p>Total Credit: {registration.total_credit}</p>
          {registration.missingCourses?.length > 0 && (
            <p className="text-error">Missing Courses: {registration.missingCourses.join(", ")}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Register;
