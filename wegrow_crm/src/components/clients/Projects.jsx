import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Folder,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  Circle,
  Plus,
} from "lucide-react";
import Card, { CardHeader } from "../ui/Card";
import { Select } from "../ui/Input";
import { useDispatch } from "react-redux";
import { addTaskThunk } from "../../store/project/projectThunk";
const Projects = ({ projects }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [expandedProjectId, setExpandedProjectId] = useState(null);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [addingTaskForProjectId, setAddingTaskForProjectId] = useState(null);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("todo");
  const [taskPriority, setTaskPriority] = useState("medium");
  const [addingTask, setAddingTask] = useState(false)
  const toggleProject = (id) => {
    setExpandedProjectId(expandedProjectId === id ? null : id);
  };
  const toggleTask = (id) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
  };
  const handleAddTask = async () => {
    console.log({taskTitle, taskDescription, taskStatus, taskPriority, projectId: addingTaskForProjectId})
    setAddingTask(true)
    await dispatch(addTaskThunk({
      title: taskTitle,
      description: taskDescription,
      status: taskStatus,
      priority: taskPriority,
      projectId: addingTaskForProjectId
    }))
    setAddingTask(false)
    setAddingTaskForProjectId(null);
    setTaskTitle("");
    setTaskDescription("");
    setTaskStatus("todo");
    setTaskPriority("medium");
  }
  const handleCancelAddingTask = () => {
    setAddingTaskForProjectId(null);
    setTaskTitle("");
    setTaskDescription("");
    setTaskStatus("todo");
    setTaskPriority("medium");
  }
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
                      <h4 className="text-[12px] font-semibold text-[#7a7582] uppercase tracking-[0.5px] mb-2">
                        Project Details
                      </h4>
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
                            setTaskTitle(e.target.value)
                          }}
                          className="w-full text-[13px] border border-[#e6e0e9] rounded-md px-3 py-1.5 focus:outline-none focus:border-[#6750a4]"
                        />
                        <label className="text-[12px] font-semibold text-[#7a7582] uppercase tracking-[0.5px]">
                          Description:
                        </label>
                        <textarea
                          placeholder="Describe the task at hand."
                          onChange={(e) => {
                            setTaskDescription(e.target.value)
                          }}
                          className="w-full text-[13px] border border-[#e6e0e9] rounded-md px-3 py-1.5 focus:outline-none focus:border-[#6750a4] resize-none"
                          rows={2}
                        />
                        <div className="flex gap-3">
                          <Select label="Status" options={["todo", "inprogress", "completed"]}
                            value={taskStatus}
                            onChange={(e) => { setTaskStatus(e.target.value) }}
                          />
                          <Select label="Priority" options={["high", "medium", "low"]}
                            value={taskPriority}
                            onChange={(e) => { setTaskPriority(e.target.value) }}
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
                          className="px-3 py-1.5 text-[12px] font-medium bg-[#6750a4] text-white hover:bg-[#4f378a] rounded-md transition-colors">
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
                                      console.log("completed", task.id);
                                    }}
                                  >
                                    {task.status === "Completed" ? (
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
                                      className={`text-[13px] font-medium ${task.status === "Completed" ? "text-[#00531b] line-through opacity-70" : "text-[#1d1b20]"}`}
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
                              {isTaskExpanded && task.description && (
                                <div className="p-3 bg-[#f8f5fa] border-t border-[#e6e0e9] text-[13px] text-[#49454f]">
                                  {task.description}
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
