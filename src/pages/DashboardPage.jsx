import ProjectList from "@/features/projects/ProjectList";
import { useSelector } from "react-redux";

const DashboardPage = () => {
  const projects = useSelector(state => state.projects);

  return (
    <div className="">
      <ProjectList projects={projects} />
    </div>
  );
};

export default DashboardPage
