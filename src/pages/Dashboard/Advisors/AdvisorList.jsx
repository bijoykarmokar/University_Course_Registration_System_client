import React from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import axiosSecure from "../../../services/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

export default function AdvisorList() {
  const {
    data: advisors = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["advisors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/advisors");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirm.isConfirmed) {
        const res = await axiosSecure.delete(`/advisors/${id}`);
        if (res.data.deletedCount) {
          Swal.fire({
            title: "Deleted!",
            text: "Advisor has been deleted successfully.",
            icon: "success",
          });
          refetch(); // refresh advisor list
        }
      }
    } catch (error) {
      console.error("Delete error:", error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while deleting!",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FaChalkboardTeacher className="text-primary" /> Advisors
      </h2>

      {advisors.length === 0 ? (
        <div className="alert alert-warning shadow-lg">
          <span>No advisors found in database!</span>
        </div>
      ) : (
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {advisors.map((a, idx) => (
              <tr key={a._id}>
                <th>{idx + 1}</th>
                <td className="font-medium">{a.name}</td>
                <td>{a.email}</td>
                <td>{a.department || "N/A"}</td>
                <td>
                  <button
                    onClick={() => handleDelete(a._id)}
                    className="btn btn-sm btn-outline btn-error"
                  >
                    Delete
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
