import { Route, Routes } from "react-router-dom";
import DashboardPage from "@/pages/DashboardPage";
import CreateProjectPage from "@/pages/CreateProject";
import ProjectDetails from "@/features/projects/ProjectDetails";
import Layout from "@/layout/Layout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="projects/new-project" element={<CreateProjectPage />} />
        <Route path="projects/:projectId" element={<ProjectDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
