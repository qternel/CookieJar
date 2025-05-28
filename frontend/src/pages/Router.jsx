import { Routes, Route } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { Login, Dashboard, Profile } from ".";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

const Router = () => {
  const { user } = useAuth();

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (!user) return <Login />;

  return (
    <Routes>
      <Route path={ROUTES.dashboard} element={<Dashboard />} />
      <Route path={ROUTES.profile} element={<Profile />} />
    </Routes>
  );
};

export default Router;
