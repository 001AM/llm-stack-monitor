
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

export function AuthGuard(props) {
  const { children, requiredRole } = props;
  const { user, status } = useAuth();
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    if (status === "unauthenticated") {
      navigate("/auth/login");
      return;
    }

    // Check if user has required role
    if (
      status === "authenticated" &&
      requiredRole &&
      user?.role !== requiredRole
    ) {
      navigate("/dashboard");
      return;
    }

    // User is authorized
    if (status === "authenticated") {
      setIsAuthorized(true);
    }
  }, [status, user, navigate, requiredRole]);

  // Show nothing while checking auth
  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}