import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Folder,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  Circle,
  Plus,
  Loader2,
  Edit2,
  Trash2,
  CircleCheck,
} from "lucide-react";
import { toast } from "react-hot-toast";
import Card, { CardHeader } from "../ui/Card";
import Input, { Select, Textarea } from "../ui/Input";
import { useDispatch } from "react-redux";
import {
  addTaskThunk,
  updateTaskStatusThunk, deleteProjectThunk, updateProjectThunk,
  deleteTaskThunk, updateProjectStatusThunk,
} from "../../store/project/projectThunk";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthProvider";

const Projects = ({ projects }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [expandedProjectId, setExpandedProjectId] = useState(null);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [addingTaskForProjectId, setAddingTaskForProjectId] = useState(null);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("todo");
  const [taskPriority, setTaskPriority] = useState("medium");
  const [addingTask, setAddingTask] = useState(false);
  const [changingCompleteStatus, setChangingCompleteStatus] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteTaskModal, setDeleteTaskModal] = useState(null);
  const [statusChangeModal, setStatusChangeModal] = useState({ isOpen: false, projectId: null, newStatus: null, project: null });
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [deletingTask, setDeletingTask] = useState(false)
  const [editProjectData, setEditProjectData] = useState({
    name: "",
    description: "",
    status: "",
    start_date: "",
    deadline: "",
  });
  const [editProjectLoading, setEditProjectLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { user } = useAuth();
  const toggleProject = (id) => {
    setExpandedProjectId(expandedProjectId === id ? null : id);
  };
  const toggleTask = (id) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
  };
  const handleAddTask = async () => {
    setAddingTask(true);
    try {
      await dispatch(
        addTaskThunk({
          title: taskTitle,
          description: taskDescription,
          status: taskStatus,
          priority: taskPriority,
          projectId: addingTaskForProjectId,
        }),
      ).unwrap();
      toast.success("task added successfully");
    } catch (error) {
      toast.error("Failed to add task");
    }
    setAddingTask(false);
    setAddingTaskForProjectId(null);
    setTaskTitle("");
    setTaskDescription("");
    setTaskStatus("todo");
    setTaskPriority("medium");
  };
  const handleCancelAddingTask = () => {
    setAddingTaskForProjectId(null);
    setTaskTitle("");
    setTaskDescription("");
    setTaskStatus("todo");
    setTaskPriority("medium");
  };
  const handleCompleteStatus = async (taskId) => {
    setChangingCompleteStatus(taskId);
    try {
      await dispatch(
        updateTaskStatusThunk({
          id: taskId,
          status: "completed",
        }),
      ).unwrap();
      toast.success("task completed successfully");
    } catch (error) {
      toast.error("Failed to change status");
    }
    setChangingCompleteStatus(false);
  };
  const handleDeleteTask = async (taskId) => {
    setDeletingTask(true)
    try{
      await dispatch(deleteTaskThunk(taskId)).unwrap();
      toast.success("task deleted successfully");
    } catch(error){
      toast.error("Failed to delete task");
    }
    setDeletingTask(false)
    setDeleteTaskModal(null)
  }
  const handleDeleteProject = async () => {
    setDeleteLoading(true)
    const projectId = expandedProjectId
    try {
      await dispatch(deleteProjectThunk(projectId)).unwrap();
      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error("Failed to delete project");
    }
    setDeleteModal(false)
    setDeleteLoading(false)
  };
  const startEditingProject = (project) => {
    setEditingProjectId(project.id);
    setEditProjectData({
      name: project.name || project.title || "",
      description: project.description || "",
      status: project.status || "planning",
      start_date: project.start_date ? new Date(project.start_date).toISOString().split('T')[0] : "",
      deadline: project.deadline ? new Date(project.deadline).toISOString().split('T')[0] : "",
    });
  };

  const handleCancelEditProject = () => {
    setEditingProjectId(null);
  };

  const handleEditProjectSubmit = async (projectId) => {
    setEditProjectLoading(true);
    try {
      await dispatch(
        updateProjectThunk({
          id: projectId,
          name: editProjectData.name,
          description: editProjectData.description,
          status: editProjectData.status,
          start_date: editProjectData.start_date,
          deadline: editProjectData.deadline,
        })
      ).unwrap();
      toast.success("Project updated successfully");
      setEditingProjectId(null);
    } catch (error) {
      toast.error("Failed to update project");
    }
    setEditProjectLoading(false);
  };

  const handleChangeProjectStatus = async (project, newStatus) => {
    setChangingCompleteStatus(true);
    try{
      await dispatch(updateProjectStatusThunk({id: project.id, status: newStatus})).unwrap();
      toast.success("Project status updated successfully");
    } catch(error){
      toast.error("Failed to update project status");
    }
    setChangingCompleteStatus(false);
    setStatusChangeModal({ isOpen: false, projectId: null, newStatus: null, project: null });
    };
  return (
    <>
      <Card elevation={1}>
        <div className="space-y-3">
          {projects?.map((project) => {
            const isExpanded = expandedProjectId === project.id;
            return (
              <div
                key={project.id}
                className="border border-[#e6e0e9] rounded-xl overflow-hidden"
              >
                <div
                  className="flex items-center justify-between p-4 bg-white hover:bg-[#f8f5fa] cursor-pointer transition-colors"
                  onClick={() => toggleProject(project.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#e8def9] flex items-center justify-center">
                      <Folder size={14} className="text-[#4f378a]" />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-[#1d1b20]">
                        {project.name}
                      </p>
                      <p className="text-[12px] text-[#7a7582] mt-0.5">
                        {project.status}
                      </p>
                    </div>
                  </div>
                  <div>
                    {isExpanded ? (
                      <ChevronUp size={18} className="text-[#7a7582]" />
                    ) : (
                      <ChevronDown size={18} className="text-[#7a7582]" />
                    )}
                  </div>
                </div>
                {isExpanded && (
                  <div className="bg-[#f2ecf4] p-4 border-t border-[#e6e0e9]">
                    <div className="mb-4">
                      <div className="flex justify-end items-center gap-2">
                        <Select
                          value={project.status}
                          onChange={(e) => {
                            const newStatus = e.target.value;
                            if (newStatus !== project.status) {
                              setStatusChangeModal({ isOpen: true, projectId: project.id, newStatus, project });
                            }
                          }}
                          options={["planning", "in-progress", "on-hold", "completed"].map((s)=>({value:s, label:s.charAt(0).toUpperCase() + s.slice(1)}))}
                          className="w-36 h-8 text-[12px] py-0"
                          wrapperClassName="w-36"
                        />
                        {user.role === "admin" ? (
                          <>
                            <Button
                              variant="outlined"
                              size="sm"
                              icon={<Edit2 size={14} />}
                              onClick={() => startEditingProject(project)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger-tonal"
                              size="sm"
                              icon={<Trash2 size={14} />}
                              onClick={() => {setDeleteModal(true)}}
                            >
                              Delete
                            </Button>
                          </>
                        ) : null}
                      </div>
                      {statusChangeModal.isOpen && statusChangeModal.projectId === project.id && (
                        <div className="my-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center justify-between gap-4">
                          <p className="text-[13px] text-yellow-800 font-medium m-0">
                            Are you sure you want to change the status to {statusChangeModal.newStatus}?
                          </p>
                          <div className="flex gap-2">
                            <Button
                              variant="outlined"
                              size="sm"
                              onClick={() => setStatusChangeModal({ isOpen: false, projectId: null, newStatus: null, project: null })}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="tonal"
                              size="sm"
                              className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                              disabled={changingCompleteStatus}
                              onClick={() => handleChangeProjectStatus(statusChangeModal.project, statusChangeModal.newStatus)}
                            >
                              {changingCompleteStatus? "Changing..." : "Confirm"}
                            </Button>
                          </div>
                        </div>
                      )}
                      {deleteModal && (
                        <div className="my-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between gap-4">
                          <p className="text-[13px] text-red-800 font-medium m-0">
                            Are you sure you want to delete this project?
                          </p>
                          <div className="flex gap-2">
                            <Button
                              variant="outlined"
                              size="sm"
                              onClick={() => setDeleteModal(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={handleDeleteProject}
                              disabled={deleteLoading}
                            >
                              {deleteLoading? "Deleting..." : "Yes, Delete"}
                            </Button>
                          </div>
                        </div>
                      )}
                      <h4 className="text-[12px] font-semibold text-[#7a7582] uppercase tracking-[0.5px] mb-2">
                        Project Details
                      </h4>
                      {editingProjectId === project.id ? (
                        <div className="bg-white border border-[#e6e0e9] rounded-lg p-3 mb-3 space-y-3">
                          <Input
                            label="Title"
                            value={editProjectData.name}
                            onChange={(e) => setEditProjectData({ ...editProjectData, name: e.target.value })}
                          />
                          <Textarea
                            label="Description"
                            value={editProjectData.description}
                            onChange={(e) => setEditProjectData({ ...editProjectData, description: e.target.value })}
                            rows={3}
                          />
                          <div className="flex gap-3">
                            <Select
                              label="Status"
                              options={["planning", "in-progress", "on-hold", "completed"].map((s)=>({value:s, label:s.charAt(0).toUpperCase() + s.slice(1)}))}
                              value={editProjectData.status}
                              onChange={(e) => setEditProjectData({ ...editProjectData, status: e.target.value })}
                              wrapperClassName="flex-1"
                            />
                            <Input
                              label="Start Date"
                              type="date"
                              value={editProjectData.start_date}
                              onChange={(e) => setEditProjectData({ ...editProjectData, start_date: e.target.value })}
                              wrapperClassName="flex-1"
                            />
                            <Input
                              label="Deadline"
                              type="date"
                              value={editProjectData.deadline}
                              onChange={(e) => setEditProjectData({ ...editProjectData, deadline: e.target.value })}
                              wrapperClassName="flex-1"
                            />
                          </div>
                          <div className="flex justify-end gap-2 pt-2">
                            <Button
                              variant="outlined"
                              size="sm"
                              onClick={handleCancelEditProject}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="tonal"
                              size="sm"
                              onClick={() => handleEditProjectSubmit(project.id)}
                              className="bg-[#c2e7d0] text-[#146c2e] hover:bg-[#a6d9b9]"
                            >
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white rounded-lg p-3 space-y-2 border border-[#e6e0e9]">
                          {project.description ? (
                            <p className="text-[13px] text-[#49454f]">
                              {project.description}
                            </p>
                          ) : (
                            <p className="text-[13px] text-[#7a7582] italic">
                              No description provided.
                            </p>
                          )}
                          <div className="flex flex-wrap gap-4 text-[12px] text-[#7a7582]">
                            {project.start_date && (
                              <span>
                                <strong className="font-medium text-[#1d1b20]">
                                  Start:
                                </strong>{" "}
                                {new Date(
                                  project.start_date,
                                ).toLocaleDateString()}
                              </span>
                            )}
                            {project.deadline && (
                              <span>
                                <strong className="font-medium text-[#1d1b20]">
                                  Deadline:
                                </strong>{" "}
                                {new Date(project.deadline).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-[12px] font-semibold text-[#7a7582] uppercase tracking-[0.5px]">
                        Tasks
                      </h4>
                      <button
                        onClick={() =>
                          setAddingTaskForProjectId(
                            addingTaskForProjectId === project.id
                              ? null
                              : project.id,
                          )
                        }
                        className="text-[12px] font-medium text-[#6750a4] hover:text-[#4f378a] transition-colors flex items-center gap-1"
                      >
                        <Plus size={14} />
                        Add Task
                      </button>
                    </div>

                    {addingTaskForProjectId === project.id && (
                      <div className="bg-white border border-[#e6e0e9] rounded-lg p-3 mb-3 space-y-3">
                        <label className="text-[12px] font-semibold text-[#7a7582] uppercase tracking-[0.5px]">
                          Task Title:
                        </label>
                        <input
                          type="text"
                          placeholder="Task Title"
                          onChange={(e) => {
                            setTaskTitle(e.target.value);
                          }}
                          className="w-full text-[13px] border border-[#e6e0e9] rounded-md px-3 py-1.5 focus:outline-none focus:border-[#6750a4]"
                        />
                        <label className="text-[12px] font-semibold text-[#7a7582] uppercase tracking-[0.5px]">
                          Description:
                        </label>
                        <textarea
                          placeholder="Describe the task at hand."
                          onChange={(e) => {
                            setTaskDescription(e.target.value);
                          }}
                          className="w-full text-[13px] border border-[#e6e0e9] rounded-md px-3 py-1.5 focus:outline-none focus:border-[#6750a4] resize-none"
                          rows={2}
                        />
                        <div className="flex gap-3">
                          <Select
                            label="Status"
                            options={["todo", "inprogress", "completed"]}
                            value={taskStatus}
                            onChange={(e) => {
                              setTaskStatus(e.target.value);
                            }}
                          />
                          <Select
                            label="Priority"
                            options={["high", "medium", "low"]}
                            value={taskPriority}
                            onChange={(e) => {
                              setTaskPriority(e.target.value);
                            }}
                          />
                        </div>
                        <div className="flex justify-end gap-2 pt-1">
                          <button
                            onClick={handleCancelAddingTask}
                            className="px-3 py-1.5 text-[12px] font-medium text-[#7a7582] hover:bg-[#f8f5fa] rounded-md transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleAddTask}
                            disabled={addingTask}
                            className="px-3 py-1.5 text-[12px] font-medium bg-[#6750a4] text-white hover:bg-[#4f378a] rounded-md transition-colors"
                          >
                            {addingTask ? "Adding Task..." : "Save Task"}
                          </button>
                        </div>
                      </div>
                    )}
                    <div className="space-y-2">
                      {project.tasks.length > 0 ? (
                        project.tasks.map((task) => {
                          const isTaskExpanded = expandedTaskId === task.id;
                          return (
                            <div
                              key={task.id}
                              className="bg-white border border-[#e6e0e9] rounded-lg overflow-hidden"
                            >
                              <div
                                className="flex items-center justify-between p-3 cursor-pointer hover:bg-[#f8f5fa] transition-colors"
                                onClick={() => toggleTask(task.id)}
                              >
                                <div className="flex items-center gap-3">
                                  <button
                                    className="cursor-pointer"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (
                                        task.status.toLowerCase() ===
                                        "completed"
                                      ) {
                                        toast.info("task is already completed");
                                        return;
                                      }
                                      handleCompleteStatus(task.id);
                                    }}
                                  >
                                    {changingCompleteStatus === task.id ? (
                                      <Loader2
                                        size={16}
                                        className="animate-spin text-[#7a7582] shrink-0"
                                      />
                                    ) : task.status.toLowerCase() ===
                                      "completed" ? (
                                      <CheckCircle2
                                        size={16}
                                        className="text-[#00531b] shrink-0"
                                      />
                                    ) : (
                                      <Circle
                                        size={16}
                                        className="text-[#7a7582] shrink-0"
                                      />
                                    )}
                                  </button>
                                  <div>
                                    <p
                                      className={`text-[13px] font-medium ${task.status.toLowerCase() === "completed" ? "text-[#00531b] line-through opacity-70" : "text-[#1d1b20]"}`}
                                    >
                                      {task.title}
                                    </p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                      <span className="text-[11px] text-[#7a7582]">
                                        {task.status}
                                      </span>
                                      {task.priority && (
                                        <span
                                          className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                            task.priority === "High"
                                              ? "bg-[#ffdad6] text-[#93000a]"
                                              : task.priority === "Medium"
                                                ? "bg-[#fef7e0] text-[#b06000]"
                                                : "bg-[#e8def9] text-[#4f378a]"
                                          }`}
                                        >
                                          {task.priority}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  {isTaskExpanded ? (
                                    <ChevronUp
                                      size={16}
                                      className="text-[#7a7582]"
                                    />
                                  ) : (
                                    <ChevronDown
                                      size={16}
                                      className="text-[#7a7582]"
                                    />
                                  )}
                                </div>
                              </div>
                              {isTaskExpanded && (task.description || user.role === "admin") && (
                                <div className="p-3 bg-[#f8f5fa] border-t border-[#e6e0e9] flex flex-col gap-3">
                                  {user.role === "admin" && (
                                    <div className="flex justify-end">
                                      <Button
                                        variant="danger-tonal"
                                        size="sm"
                                        icon={<Trash2 size={14} />}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setDeleteTaskModal(task.id);
                                        }}
                                      >
                                        Delete
                                      </Button>
                                    </div>
                                  )}
                                  {deleteTaskModal === task.id && (
                                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between gap-4">
                                      <p className="text-[13px] text-red-800 font-medium m-0">
                                        Are you sure you want to delete this task?
                                      </p>
                                      <div className="flex gap-2">
                                        <Button
                                          variant="outlined"
                                          size="sm"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setDeleteTaskModal(null);
                                          }}
                                        >
                                          Cancel
                                        </Button>
                                        <Button
                                          variant="danger"
                                          size="sm"
                                          disabled={deletingTask}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteTask(task.id);
                                          }}
                                        >
                                          {deletingTask ? (
                                            <div className="flex items-center gap-2">
                                              <Loader2 size={16} className="animate-spin" />
                                              <span>Deleting...</span>
                                            </div>
                                          ) : (
                                            "Yes, Delete"
                                          )}
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                  {task.description && (
                                    <div className="text-[13px] text-[#49454f]">
                                      {task.description}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-[13px] text-[#7a7582] italic">
                          No tasks found.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
};

export default Projects;
