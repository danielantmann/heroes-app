import { Outlet } from "react-router";

export const HeroLayout = () => {
  return (
    <div className="bg-red-500">
      <Outlet />
    </div>
  );
};
