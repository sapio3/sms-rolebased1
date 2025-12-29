import React from "react";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");

  // No token → not authenticated
  if (!token) {
    return <Navigate to="/" replace />;
  }

  let role = null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    // Common role formats handled safely
    if (payload.role) {
      role = payload.role;
    } else if (payload.roles && Array.isArray(payload.roles)) {
      role = payload.roles[0].replace("ROLE_", "");
    } else if (payload.authorities && Array.isArray(payload.authorities)) {
      role = payload.authorities[0];
    }
  } catch {
    return <Navigate to="/" replace />;
  }

  // Role not allowed
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/403" replace />;
  }

  return children;
}
