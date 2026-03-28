import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from './auth';

const ProtectedRoute = () => {
  // Check if the user is authenticated from localStorage
  const hasAccess = isAuthenticated();

  // If they don't have access, redirect to the birthday-only fallback page
  if (!hasAccess) {
    return <Navigate to="/birthday" replace />;
  }

  // If they have access, render the child route layout components
  return <Outlet />;
};

export default ProtectedRoute;
