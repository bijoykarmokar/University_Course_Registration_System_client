import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axiosSecure from "../services/axiosSecure";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const fetchCourses = () => {
    axiosSecure.get("/courses").then(res => setCourses(res.data));
  };

  useEffect(() => fetchCourses(), []);

  const onSubmit = data => {
    data.credit = Number(data.credit);
    axiosSecure.post("/courses", data)
      .then(() => {
        fetchCourses();
        reset();
        alert("Course added!");
      })
      .catch(err => alert(err.response?.data?.error || "Error adding course"));
  };

  const deleteCourse = id => {
    if (!window.confirm("Are you sure?")) return;
    axiosSecure.delete(`/courses/${id}`).then(() => fetchCourses());
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Courses</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 mb-6">
        <input {...register("_id")} placeholder="Course ID" className="input input-bordered" required />
        <input {...register("name")} placeholder="Course Name" className="input input-bordered" required />
        <input {...register("credit")} placeholder="Credit" type="number" className="input input-bordered" required />
        <button type="submit" className="btn btn-primary">Add</button>
      </form>

      <table className="table w-full table-zebra">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Credit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(c => (
            <tr key={c._id}>
              <td>{c._id}</td>
              <td>{c.name}</td>
              <td>{c.credit}</td>
              <td>
                <button className="btn btn-sm btn-error" onClick={() => deleteCourse(c._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Courses;
