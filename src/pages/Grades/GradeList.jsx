import React, { useEffect, useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import axiosSecure from "../../services/axiosSecure";


export default function GradeList() {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await axiosSecure.get("/grades");
        setGrades(res.data);
      } catch (err) {
        console.error("Error fetching grades:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGrades();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading grades...</div>;
  }

  return (
    <div className="overflow-x-auto w-full">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FaGraduationCap className="text-primary" /> Grades
      </h2>

      {grades.length === 0 ? (
        <div className="alert alert-warning shadow-lg">
          <span>No grades found!</span>
        </div>
      ) : (
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Student</th>
              <th>Course</th>
              <th>Grade</th>
              <th>Semester</th>
              <th>Year</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((g, idx) => (
              <tr key={g._id}>
                <th>{idx + 1}</th>
                <td>{g.student.name}</td>
                <td>{g.course.name}</td>
                <td>{g.grade}</td>
                <td>{g.semester}</td>
                <td>{g.year}</td>
                <td>
                  <button className="btn btn-sm btn-outline btn-primary mr-2">View</button>
                  <button className="btn btn-sm btn-outline btn-secondary">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
