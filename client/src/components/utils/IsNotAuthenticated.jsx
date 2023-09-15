import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";

export default function IsNotAuthenticated() {
  const { user } = useAuth();

  return user ? <Navigate to="/" /> : <Outlet />;
}
