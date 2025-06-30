import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "@/pages/DashboardPage";
import CreateProjectPage from "@/pages/CreateProject";
import ProjectDetails from "@/features/projects/ProjectDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/projects/new-project" element={<CreateProjectPage/>}/>
      <Route path="/projects/:projectId" element={<ProjectDetails />} />
    </Routes>
  );
};

export default AppRoutes;