import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaUserCircle } from "react-icons/fa";
import axiosSecure from "../../services/axiosSecure";

export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosSecure.get(`/users/${id}`);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Loading user profile...</div>;
  }

  if (!user) {
    return (
      <div className="alert alert-error shadow-lg mt-4">
        <span>User not found!</span>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-base-200 rounded-lg shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <FaUserCircle className="text-6xl text-primary" />
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm mt-1 capitalize">Role: {user.role}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <span className="font-semibold">Created At: </span>
          {new Date(user.createdAt).toLocaleString()}
        </div>
        <div>
          <span className="font-semibold">Updated At: </span>
          {new Date(user.updatedAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
