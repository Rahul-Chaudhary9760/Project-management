import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { updateProject } from "../projects/projectSlice";
import { addMember } from "../teams/teamSlice";
import TaskList from "../tasks/TaskList";
import TaskChart from "../tasks/TaskChart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const project = useSelector(state =>
    state.projects.find(p => p.id === projectId)
  );

  const tasks = useSelector(state =>
    state.tasks.filter(t => t.projectId === projectId)
  );

  const allTeamMembers = useSelector(state => state.team);

  const projectMembers = (project?.members || [])
    .map(id => allTeamMembers.find(m => m.id === id))
    .filter(Boolean);

  const [editing, setEditing] = useState(false);
  const [descValue, setDescValue] = useState(project?.description || "");
  const editorContainerRef = useRef(null);
  const quillInstanceRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [memberRole, setMemberRole] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [addError, setAddError] = useState("");


  useEffect(() => {
    setDescValue(project?.description || "");
  }, [project?.description]);

  useEffect(() => {
    if (!editorContainerRef.current || quillInstanceRef.current) return;

    quillInstanceRef.current = new Quill(editorContainerRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          ["link", "blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["clean"],
        ],
      },
      readOnly: !editing,
    });

    quillInstanceRef.current.root.innerHTML = project?.description || "";

    quillInstanceRef.current.on("text-change", () => {
      const plainText = quillInstanceRef.current.getText().trim();
        setDescValue(plainText);
      
    });

    return () => {
      quillInstanceRef.current?.off("text-change");
      quillInstanceRef.current = null;
    };
  }, []);

  // Toggle Quill read-only on edit mode
  useEffect(() => {
    if (quillInstanceRef.current) {
      quillInstanceRef.current.enable(editing);
      if (editing) {
        quillInstanceRef.current.root.innerHTML = project?.description || "";
        setDescValue(project?.description || "");
      }
    }
  }, [editing]);

  if (!project) return <div>Project not found.</div>;

  const handleSave = () => {
    dispatch(updateProject({ id: projectId, data: { description: descValue } }));
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    setAddError("");

    if (!memberName.trim() || !memberEmail.trim()) {
      setAddError("Name and email are required.");
      return;
    }

    const existing = allTeamMembers.find(
      m => m.email.toLowerCase() === memberEmail.trim().toLowerCase()
    );

    let memberId;
    if (existing) {
      memberId = existing.id;
    } else {
      const action = addMember(memberName.trim(), memberRole.trim(), memberEmail.trim());
      dispatch(action);
      memberId = action.payload.id;
    }

    if (!(project.members || []).includes(memberId)) {
      dispatch(updateProject({
        id: projectId,
        data: { members: [...(project.members || []), memberId] }
      }));
    }

    setMemberName("");
    setMemberRole("");
    setMemberEmail("");
    setShowModal(false);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white text-black dark:bg-gray-900 dark:text-white">
      {/* Project Description */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div
              ref={editorContainerRef}
              className="border rounded p-2 min-h-[120px]"
            />
            <div className="mt-2 flex gap-2">
              {!editing ? (
                <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                  Edit Description
                </Button>
              ) : (
                <>
                  <Button size="sm" onClick={handleSave}>Save</Button>
                  <Button size="sm" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members */}
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Team Members</CardTitle>
          <Button size="sm" onClick={() => setShowModal(true)}>
            Add Member
          </Button>
        </CardHeader>
        <CardContent>
          <ul className="mb-4 list-disc list-inside">
            {projectMembers.length === 0 && (
              <li className="text-gray-500">No team members yet.</li>
            )}
            {projectMembers.map((member) => (
              <li key={member.id}>
                <span className="font-semibold">{member.name}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Add Member Modal */}
      {showModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow-lg p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">Add Team Member</h2>
        <button onClick={() => setShowModal(false)} className="text-xl px-2">&times;</button>
      </div>
      <form onSubmit={handleAddMember} className="flex flex-col gap-3">
        <input
          type="text"
          className="border rounded px-2 py-1 bg-white dark:bg-gray-900 text-black dark:text-white border-gray-300 dark:border-gray-700"
          placeholder="Name"
          value={memberName}
          onChange={e => setMemberName(e.target.value)}
          required
        />
        <input
          type="text"
          className="border rounded px-2 py-1 bg-white dark:bg-gray-900 text-black dark:text-white border-gray-300 dark:border-gray-700"
          placeholder="Role"
          value={memberRole}
          onChange={e => setMemberRole(e.target.value)}
        />
        <input
          type="email"
          className="border rounded px-2 py-1 bg-white dark:bg-gray-900 text-black dark:text-white border-gray-300 dark:border-gray-700"
          placeholder="Email"
          value={memberEmail}
          onChange={e => setMemberEmail(e.target.value)}
          required
        />
        <div className="flex gap-2 mt-2">
          <Button size="sm" type="submit">Add</Button>
          <Button size="sm" variant="outline" type="button" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </div>
        {addError && <div className="text-red-500 text-sm">{addError}</div>}
      </form>
    </div>
  </div>
)}


      <TaskChart tasks={tasks} />
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Tasks List</h2>
        <TaskList projectId={projectId} />
      </div>
      <div className="mt-8">
        <Button asChild>
          <Link to="/dashboard">Back to Projects</Link>
        </Button>
      </div>
    </div>
  );
}
