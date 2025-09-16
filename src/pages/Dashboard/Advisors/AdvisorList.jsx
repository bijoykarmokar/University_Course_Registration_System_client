import React, { useEffect, useState } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import axiosSecure from "../../../services/axiosSecure";
import { useQuery } from "@tanstack/react-query";


export default function AdvisorList() {
  // const [advisors, setAdvisors] = useState([]);
  // const [loading, setLoading] = useState(true);

   const {data:advisors=[],isLoading} = useQuery({
     queryKey:["advisors"],
     queryFn: async()=>{
      const res = await axiosSecure.get("/advisors");
      return res.data;
     }
   })


  // useEffect(() => {
  //   const fetchAdvisors = async () => {
  //     try {
  //       const res = await axiosSecure.get("/advisors");
  //       setAdvisors(res.data);
  //     } catch (err) {
  //       console.error("Error fetching advisors:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchAdvisors();
  // }, []);

  if (isLoading) {
    return <div className="text-center py-8"> <span className="loading loading-dots loading-xl"></span></div>;
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
                <td>{a.department}</td>
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
