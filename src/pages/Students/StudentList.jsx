import React, { useEffect, useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import axiosSecure from "../../services/axiosSecure";


export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch data from backend
    const fetchStudents = async () => {
      try {
        const res = await axiosSecure.get("/students"); // backend endpoint
        setStudents(res.data);
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading students...</div>;
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
                <td>{s.department}</td>
                <td>{s.year}</td>
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

