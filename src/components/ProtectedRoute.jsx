import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(null); 

  useEffect(() => {
    const authStatus = localStorage.getItem("auth");
    if (authStatus) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
      navigate("/signin"); 
    }
  }, [navigate]);

  if (isAuth === null) {
    return <div>Loading...</div>; 
  }

  return isAuth ? children : null;
};

export default ProtectedRoute;
