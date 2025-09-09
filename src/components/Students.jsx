import React, { useEffect, useState } from "react";
import axiosSecure from "../services/axiosSecure";

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axiosSecure.get("/students")
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Students List</h2>
      <table className="table w-full table-zebra">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Semester</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s._id}>
              <td>{s._id}</td>
              <td>{s.name}</td>
              <td>{s.department_id}</td>
              <td>{s.semester}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
