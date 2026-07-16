const supabase = require("../config/supabase")
const {createNotification} = require("../services/notificationServices")
exports.getProjects = async (req, res, next) => {
    const {clientId} = req.params
    try {
    const { data: projects, error: projectsError } = await supabase
      .from("projects")
      .select(`*,
        tasks (*)`)
      .eq("client_id", clientId)
      .order("created_at", { ascending: false });
    if (projectsError) {
      console.log("error in fetching projects", projectsError);
      return res
        .status(400)
        .json({ success: false, message: `Error in fetching projects! ${projectsError.message}` });
    }
    return res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      projects,
    });
    } catch (error) {
        console.log("error in fetching projects", error)
        return res.status(500).json({success: false, message: "Internal Server Error"})
    }
}
exports.addProject = async (req, res, next) => {
  const { title, description, status, startDate, deadline, clientId } = req.body
  console.log("inside add project controller",req.body)
  if(!title || !description || !status || !startDate || !deadline || !clientId){
    return res.status(400).json({success: false, message: "Please fill all the fields"})
  }
  try{
    const {data: project, error: projectError} = await supabase
    .from("projects")
    .insert({
      name: title,
      description: description,
      status: status,
      start_date: startDate,
      deadline: deadline,
      client_id: clientId
    })
    .select(`*,
        tasks (*)`)
    .single()
    if(projectError){
      console.log("error in adding project", projectError)
      return res.status(400).json({success: false, message: `Error in adding project! ${projectError.message}`})
    }
    const {data: client} = await supabase.from("clients").select(`
      name,
      company,
      email,
      phone
      `)
      .eq("id", clientId)
      .single()
    await createNotification({
      title: "Project Added",
      message: `'${title}' project added for '${client.name}, ${client.company}'`,
      type: "project",
    })
    return res.status(200).json({
      success: true,
      message: "Project added successfully",
      project: {
        ...project,
        createdAt: new Date(project.created_at),
        updatedAt: new Date(project.updated_at),
      },
    })
  }
  catch(error){
    console.log("error in adding project", error)
    return res.status(500).json({success: false, message: "Internal Server Error"})
  }
}
exports.deleteProject = async (req, res, next) => {
  const {projectId} = req.params
  try{
    const { error } = await supabase.from("projects").delete().eq("id", projectId);

    if (error) {
      return res.status(400).json({
        success: false,
        message: `Error in deleting project! ${error.message}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      projectId,
    });
  } catch(error){
    console.log(error)
    return res.status(500).json({ssuccess: false, message: "internal server error"})
  }
}
exports.updateProject = async (req, res, next) => {
  const {projectId} = req.params
  console.log(req.body)
  const {name, description, status, start_date, deadline, clientId} = req.body
  try{
    const {data: project, error} = await supabase
    .from("projects")
    .update({
      name: name,
      description: description,
      status: status,
      start_date: start_date,
      deadline: deadline,
    })
    .eq("id", projectId)
    .select(`*, tasks (*)`)
    .single()
    if(error){
      console.log("error in updating project", error)
      return res.status(400).json({success: false, message: `Error in updating project! ${error.message}`})
    }
    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project: {
        ...project,
        createdAt: new Date(project.created_at),
        updatedAt: new Date(project.updated_at),
      },
    })
  } catch(error){
    console.log("error in updating project", error)
    return res.status(500).json({success: false, message: "Internal Server Error"})
  }
}
exports.updateProjectStatus = async (req, res, next) => {
  const {projectId} = req.params
  console.log(req.body)
  const {status} = req.body
  try{
    const {data: project, error} = await supabase
    .from("projects")
    .update({
      status: status,
    })
    .eq("id", projectId)
    .select(`*, tasks (*)`)
    .single()
    if(error){
      console.log("error in updating project status", error)
      return res.status(400).json({success: false, message: `Error in updating project status! ${error.message}`})
    }
    return res.status(200).json({
      success: true,
      message: "Project status updated successfully",
      project: {
        ...project,
        createdAt: new Date(project.created_at),
        updatedAt: new Date(project.updated_at),
      },
    })
  } catch(error){
    console.log("error in updating project status", error)
    return res.status(500).json({success: false, message: "Internal Server Error"})
  }
}