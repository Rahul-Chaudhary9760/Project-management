import ProjectList from "@/features/projects/ProjectList";
import { useSelector } from "react-redux";

const DashboardPage = () => {
  const projects = useSelector(state => state.projects);
  const tasks = useSelector(state => state.tasks);

  return (
    <div className="">
      <ProjectList projects={projects} />
    </div>
  );
};

export default DashboardPage
