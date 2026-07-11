const supabase = require("../config/supabase")
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