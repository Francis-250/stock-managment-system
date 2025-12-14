import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "./AuthContext";

function ProtectedRoute({ children, roles }) {
  const { authenticated, role, loading } = useContext(userContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;
