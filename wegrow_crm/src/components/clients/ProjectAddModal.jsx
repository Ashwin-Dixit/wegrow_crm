import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Select } from "@/components/ui/Input";
import { useDispatch } from "react-redux";
import { addProjectThunk } from "@/store/project/projectThunk";
import { toast } from "react-hot-toast";
import { Calendar } from "lucide-react";
const ProjectAddModal = ({addProjectModal, setAddProjectModal, id}) => {
    const [addingProject, setAddingProject] = useState(false)
    const [projectTitle, setProjectTitle] = useState("")
      const [description, setDescription] = useState("")
      const [projectStatus, setProjectStatus] = useState("planning")
      const [startDate, setStartDate] = useState("")
      const [deadline, setDeadline] = useState("")
      const projectStatusOpts = ["planning", "in-progress", "on-hold", "completed"].map((s)=>({value:s, label:s.charAt(0).toUpperCase() + s.slice(1)}))
      const dispatch = useDispatch()
      const handleAddProject = async ()=>{
          setAddingProject(true)
          const projectDetails = {
            title: projectTitle,
            description: description,
            status: projectStatus,
            startDate: startDate,
            deadline: deadline,
            clientId: id,
          }
          try{
            await dispatch(addProjectThunk(projectDetails)).unwrap()
            toast.success("Project added successfully");
            setProjectTitle("")
            setProjectStatus("")
            setDescription("")
            setStartDate("")
            setDeadline("")
          }
          catch(error){
            console.log("error in adding project", error);
            toast.error("Failed to add project, try again, make sure to fill all the details.");
          }
          setAddingProject(false)
          setAddProjectModal(false)
        }
    return(
        <>
        <Modal
        isOpen={addProjectModal}
        onClose={() => setAddProjectModal(false)}
        title="Add Project"
        size="md"
        footer={
          <>
            <Button
              variant="ghost"
              onClick={() => setAddProjectModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="tonal"
              onClick={handleAddProject}
              disabled={addingProject}
              className="bg-[#c2e7d0] text-[#146c2e] hover:bg-[#a6d9b9]"
            >
              {addingProject ? "Creating..." : "Create Project"}
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <div>
            <Input           //project.name
              type="text"
              label="Project Title"
              placeholder="Give a name to this project"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
            />
          </div>
          <div>
            <Input           //project.description
              type="text"
              label="Description"
              placeholder="Describe the required project"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Select          //project.status
              label={"Status"}
              value={projectStatus}
              onChange={(e) => setProjectStatus(e.target.value)}
              options={projectStatusOpts}
              placeholder="Select Status"
            />
          </div>
          <Input        //project.start_date
          type="date"
          label="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Select Start Date"
          icon={<Calendar size={15} />}
        />
        <Input              //project.deadline
          type="date"
          label="Deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          placeholder="Select Deadline"
          icon={<Calendar size={15} />}
        />
        </div>
      </Modal>
        </>
    )
}
export default ProjectAddModal