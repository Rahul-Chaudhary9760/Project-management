import React from "react";
import { useSelector } from "react-redux";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";

export default function ProjectList() {
  const navigate = useNavigate();
  const projects = useSelector(state => state.projects);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button asChild>
          <Link to="/projects/new-project">+ Add Project</Link>
        </Button>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {(!projects || projects.length === 0) ? (
          <div className="col-span-full text-center py-12">
            <p className="mb-4 text-gray-500">No projects found.</p>
            <Button onClick={() => navigate("/projects/new-project")}>Create your first Project</Button>
          </div>
        ) : (
          projects.map((project) => (
            <Card
                 key={project.id}
              className="cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(`/projects/${project.id}`)}
            >
                <CardHeader>
                    <CardTitle>
                    <span className="text-muted-foreground text-sm block">Project Name</span>
                    <span className="text-2xl font-bold">{project.name}</span>
                    </CardTitle>
                    <CardDescription>
                    <span className="text-muted-foreground text-sm block mt-2">Description</span>
                    <span className="text-base">{project.description}</span>
                    </CardDescription>
                </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}