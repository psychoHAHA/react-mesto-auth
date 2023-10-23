import { Navigate } from "react-router-dom"

function ProtectedRoute({loggedIn, children}) {
  console.log(loggedIn);
  if (!loggedIn) {
    return <Navigate to="/sign-in" replace />
  }
  return children
}

export default ProtectedRoute
