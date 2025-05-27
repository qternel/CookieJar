import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  
  if (!token) {
    // Можно сохранить URL, куда хотел попасть пользователь
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  
  return children;
}