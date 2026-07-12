const supabase = require("../config/supabase");
const {createNotification} = require("../services/notificationServices")
exports.createTask = async (req, res, next) => {
  const { title, description, status, priority, projectId } = req.body;
  try {
    const { data: task, error: taskError } = await supabase
      .from("tasks")
      .insert({
        title: title,
        description: description,
        status: status,
        priority: priority,
        project_id: projectId,
      })
      .select("*")
      .single();
    if (taskError) {
      console.log("error in creating task", taskError);
      return res
        .status(400)
        .json({ success: false, message: taskError.message });
    }
    const {data: project} = await supabase.from("projects").select(`name, clients(name, company)`).eq("id", projectId).single();
    await createNotification({
      title: "Task Created",
      message: `'${title}' task created in '${project.name}' project for '${project.clients.name}, ${project.clients.company}'`,
      type: "task",
    });
    return res.status(200).json({
      success: true,
      message: "Task created successfully",
      task: {
        ...task,
        createdAt: new Date(task.created_at),
        updatedAt: new Date(task.updated_at),
      },
    });
  } catch (error) {
    console.log("error in creating task", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
