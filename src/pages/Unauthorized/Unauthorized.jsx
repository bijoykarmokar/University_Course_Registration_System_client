import React from "react";
import { Link } from "react-router";
import { FaExclamationTriangle } from "react-icons/fa";

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
        <FaExclamationTriangle className="text-6xl text-yellow-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Unauthorized Access</h1>
        <p className="text-gray-600 mb-6">
          Sorry, you do not have permission to view this page.
        </p>
        <Link
          to="/"
          className="btn btn-primary btn-outline hover:btn-primary"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
