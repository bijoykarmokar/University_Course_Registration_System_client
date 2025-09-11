import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router";
import axiosSecure from "../../services/axiosSecure";


export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosSecure.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading users...</div>;
  }

  return (
    <div className="overflow-x-auto w-full">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FaUsers className="text-primary" /> Users
      </h2>

      {users.length === 0 ? (
        <div className="alert alert-warning shadow-lg">
          <span>No users found!</span>
        </div>
      ) : (
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr key={u._id}>
                <th>{idx + 1}</th>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td className="capitalize">{u.role}</td>
                <td>
                  <Link
                    to={`/users/${u._id}`}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
