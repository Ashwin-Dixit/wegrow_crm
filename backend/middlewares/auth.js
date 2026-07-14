const supabase = require("../config/supabase");

exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    const { data: employee } = await supabase
      .from("employees")
      .select("id, full_name, employee_id, role")
      .eq("auth_user_id", data.user.id)
      .single();

    req.user = {
      id: data.user.id,
      fullName: employee.full_name,
      employeeId: employee.id,
      employeeCompanyId: employee.employee_id,
      role: employee.role,
    };

    next();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
