import React from "react";
import { Navigate } from "react-router";
import { ROLES } from "../../utils/roles.js";

// Protect routes for Admin only
export default function AdminRoute({ userRole, children }) {
  if (userRole !== ROLES.ADMIN) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
}
