import React, { useEffect, useState } from "react";
import { FaBuilding } from "react-icons/fa";
import axiosSecure from "../../../services/axiosSecure";


export default function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axiosSecure.get("/departments");
        setDepartments(res.data);
      } catch (err) {
        console.error("Error fetching departments:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading departments...</div>;
  }

  return (
    <div className="overflow-x-auto w-full">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FaBuilding className="text-primary" /> Departments
      </h2>

      {departments.length === 0 ? (
        <div className="alert alert-warning shadow-lg">
          <span>No departments found in database!</span>
        </div>
      ) : (
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Department Name</th>
              <th>Code</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((d, idx) => (
              <tr key={d._id}>
                <th>{idx + 1}</th>
                <td className="font-medium">{d.name}</td>
                <td>{d.code}</td>
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

