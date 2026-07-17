const supabase = require("../config/supabase");

exports.refreshSession = async (req, res) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Refresh token missing",
    });
  }

  const { data, error } = await supabase.auth.refreshSession({
    refresh_token: refreshToken,
  });

  if (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid refresh token",
    });
  }

  res.cookie("access_token", data.session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 60 * 60 * 1000,
  });

  res.cookie("refresh_token", data.session.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return res.json({
    success: true,
  });
};
exports.authme = async (req, res) => {
  try {
    const { data: employee, error: employeeError } = await supabase
      .from("employees")
      .select("*")
      .eq("auth_user_id", req.user.id)
      .single();
    if (employeeError) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }
    return res.status(200).json({
      success: true,
      user: {
        fullname: employee.full_name,
        email: employee.email,
        employeeId: employee.employee_id,
        role: employee.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
exports.signup = async (req, res) => {
  try {
    const { fullname, email, employeeId, password } = req.body;
    if (!fullname || !email || !password || !employeeId) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields",
      });
    }
    const { data: existingUser, error: existingUserError } = await supabase
      .from("employees")
      .select("*")
      .or(`email.eq.${email},employee_id.eq.${employeeId}`);
    if (existingUser.length > 0) {
      console.log(existingUser);
      return res.status(400).json({
        success: false,
        message: "Email or employee ID already exists",
      });
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    console.log(data);
    if (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    const authUserId = data.user.id;
    const { error: employeeError } = await supabase.from("employees").insert({
      auth_user_id: authUserId,
      full_name: fullname,
      email: email,
      employee_id: employeeId,
    });
    if (employeeError) {
      console.log(employeeError);
      await supabase.auth.admin.deleteUser(authUserId);
      return res.status(400).json({
        success: false,
        message: "Failed to create employee, Try again later",
      });
    }
    return res.status(201).json({
      success: true,
      message:
        "User registered successfully, Please check your email for verification",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
    const { data: signinData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log("error in signin", error);
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    res.cookie("access_token", signinData.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 60 * 60 * 1000,
    });
    res.cookie("refresh_token", signinData.session.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    const { data: employee, error: employeeError } = await supabase
      .from("employees")
      .select("*")
      .eq("auth_user_id", signinData.user.id)
      .single();
    if (employeeError) {
      console.log("error in employee fetch", employeeError);
      return res.status(400).json({
        success: false,
        message: "Could not fetch employee details!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        fullname: employee.full_name,
        email: employee.email,
        employeeId: employee.employee_id,
        role: employee.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("access_token");

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
