import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const isAuth = localStorage.getItem("auth");

  useEffect(() => {
    if (!isAuth) {
      navigate("/signin");
    } else {
      setIsLoading(false);
    }
  }, [isAuth, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuth) {
    return null; 
  }

  return children;
};

export default ProtectedRoute;
