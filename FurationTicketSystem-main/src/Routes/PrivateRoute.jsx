import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { pathname } = useLocation();
  const isAuth = true;
  if (isAuth) {
    return children;
  } else {
    return <Navigate to="/login" state={`${pathname}`} replace />;
  }
};

export default PrivateRoute;
