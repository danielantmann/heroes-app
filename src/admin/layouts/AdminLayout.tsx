import React from "react";
import { Outlet } from "react-router";

export const AdminLayout = () => {
  return (
    <div className="bg-blue-900">
      <Outlet />
    </div>
  );
};
