import React, { useEffect, useState } from "react";
import axiosSecure from "../../services/axiosSecure";
import Swal from "sweetalert2";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    _id: "",
    name: "",
    email:"",
    department_id: "",
    semester: "",
    year:"",
  });

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const res = await axiosSecure.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.error("❌ Error fetching students:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle input change
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Create student
  const handleCreateStu = async () => {
    try {
      const res = await axiosSecure.post("/students", form);

      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Student created successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setForm({ _id: "", name: "", department_id: "", semester: "" });
        fetchStudents();
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "⚠️ Student with this ID already exists!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("❌ Error creating student:", err);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "❌ Failed to create student. Please try again.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Students Form</h2>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
        {["_id", "name","email", "department_id", "semester","year"].map((field) => (
          <input
            key={field}
            placeholder={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            className="border rounded-lg p-2"
          />
        ))}
      </div>

      <button
        onClick={handleCreateStu}
        className="w-full bg-blue-600 text-white font-semibold rounded-lg py-2 hover:bg-blue-700 transition"
      >
        Create Student
      </button>
    </div>
  );
}
