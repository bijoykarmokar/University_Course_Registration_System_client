import React, { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";
import axiosSecure from "../../services/axiosSecure";


export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axiosSecure.get("/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading courses...</div>;
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
                <td className="font-medium">{c.code}</td>
                <td>{c.name}</td>
                <td>{c.credit}</td>
                <td>{c.department}</td>
                <td>
                  <button className="btn btn-sm btn-outline btn-primary mr-2">
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

