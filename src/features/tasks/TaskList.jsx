import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTask, deleteTask } from "./taskSlice";
import TaskForm from "./Taskform";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const statusList = [
  { key: "todo", label: "To Do" },
  { key: "inprogress", label: "In Progress" },
  { key: "done", label: "Done" },
];

export default function TaskList({ projectId }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editTask, setEditTask] = useState(null); // <-- NEW
  const dispatch = useDispatch();
  const allTasks = useSelector((state) =>
    state.tasks.filter((t) => t.projectId === projectId)
  );
  const tasksByStatus = statusList.reduce(
    (acc, status) => ({
      ...acc,
      [status.key]: allTasks.filter((t) => t.state === status.key),
    }),
    {}
  );

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    const sourceStatus = source.droppableId;
    const destStatus = destination.droppableId;
    if (sourceStatus !== destStatus) {
      dispatch(updateTask({ id: draggableId, state: destStatus }));
    }
  };

  return (
    <div>
      {/* Add Task Button and Modal */}
      <div className="mb-4 flex justify-end">
        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogTrigger asChild>
            <Button onClick={() => setShowAdd(true)}>+ Add Task</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Task</DialogTitle>
            </DialogHeader>
            <TaskForm projectId={projectId} onFinish={() => setShowAdd(false)} />
          </DialogContent>
        </Dialog>
      </div>
      {/* Edit Task Modal */}
      <Dialog open={!!editTask} onOpenChange={(open) => !open && setEditTask(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          {editTask && (
            <TaskForm
              projectId={projectId}
              task={editTask}
              onFinish={() => setEditTask(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Drag and Drop Columns */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statusList.map((status) => (
            <Droppable droppableId={status.key} key={status.key}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`bg-muted rounded-md p-3 min-h-[200px] ${
                    snapshot.isDraggingOver ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <div className="font-semibold mb-2">{status.label}</div>
                  {tasksByStatus[status.key].map((task, index) => (
                    <Draggable draggableId={task.id} index={index} key={task.id}>
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`mb-2 shadow transition ${
                            snapshot.isDragging ? "ring-2 ring-primary" : ""
                          }`}
                        >
                          <CardContent className="p-3">
                            <div className="font-semibold">{task.title}</div>
                            <div className="text-sm text-muted-foreground">{task.description}</div>
                            <div className="flex gap-2 mt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditTask(task)}
                              >
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => dispatch(deleteTask(task.id))}
                              >
                                Delete
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}