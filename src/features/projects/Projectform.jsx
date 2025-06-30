import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProject } from "./projectSlice";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import * as Yup from 'yup'


export default function ProjectForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      status: "todo"
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Project name is required"),
      description: Yup.string().required("Description is required"),
      status: Yup.string().oneOf(["todo", "progress", "done"]).required()
    }),
    onSubmit: (values) => {
      dispatch(addProject(values.name, values.description, values.status));
      navigate("/dashboard");
    }
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim()) {
      dispatch(addProject( name, description ));
      navigate("/dashboard");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Create New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                placeholder="Enter project name"
                className="mt-2"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.name}</div>
              )}
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Describe your project"
                className="mt-2"
              />
              {formik.touched.description && formik.errors.description && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.description}</div>
              )}
            </div>

            <Button type="submit" className="w-full">
              Create Project
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}