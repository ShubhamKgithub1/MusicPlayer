import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.userInfo);

  if (!user) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

export default ProtectedRoute;
