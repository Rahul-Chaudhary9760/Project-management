import ProjectList from "@/features/projects/ProjectList";
import { useSelector } from "react-redux";
import ThemeToggleButton from "@/components/Navbar";

const DashboardPage = () => {
  const projects = useSelector(state => state.projects);

  return (
    <div className=" mt-2">      
      <ProjectList projects={projects} />
    </div>
  );
};

export default DashboardPage
