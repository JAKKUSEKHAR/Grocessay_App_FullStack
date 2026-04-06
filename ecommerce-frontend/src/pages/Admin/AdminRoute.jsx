import { Navigate } from "react-router-dom";

function AdminRoute({ role, children }) {
  if (role !== "ADMIN") {
    return <Navigate to="/" />;
  }
  return children;
}

export default AdminRoute;