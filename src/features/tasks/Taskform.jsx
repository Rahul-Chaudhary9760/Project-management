import React from "react";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "./taskSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function TaskForm({ projectId, task, onFinish }) {
  const dispatch = useDispatch();
  const isEdit = !!task;

  const formik = useFormik({
    initialValues: {
      title: task?.title || "",
      description: task?.description || "",
      state: task?.state || "todo"
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Task title is required"),
      description: Yup.string().required("Description is required")
    }),
    onSubmit: values => {
      if (isEdit) {
        dispatch(updateTask({ id: task.id, ...values }));
      } else {
        dispatch(addTask(projectId, values.title, values.description, values.state));
      }
      formik.resetForm();
      if (onFinish) onFinish();
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-2">
      <div>
        <Label htmlFor="title">Task Title</Label>
        <Input
          id="title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
          placeholder="Enter task title"
          className="mt-2"
        />
        {formik.touched.title && formik.errors.title && (
          <div className="text-red-500 text-xs mt-1">{formik.errors.title}</div>
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
          placeholder="Describe your task"
          className="mt-2"
        />
        {formik.touched.description && formik.errors.description && (
          <div className="text-red-500 text-xs mt-1">{formik.errors.description}</div>
        )}
      </div>
      <div>
        <Label htmlFor="state">Status</Label>
        <select
          id="state"
          name="state"
          value={formik.values.state}
          onChange={formik.handleChange}
           className="block w-full border rounded p-2 mt-2 bg-white text-black border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600"

        >
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <Button type="submit">{isEdit ? "Update Task" : "Add Task"}</Button>
    </form>
  );
}