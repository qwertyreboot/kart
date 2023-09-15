import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";

export default function IsStaff() {
  const { user } = useAuth();

  return user?.role !== "staff" ? <Navigate to="/" /> : <Outlet />;
}
