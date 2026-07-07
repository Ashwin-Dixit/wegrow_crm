const supabase = require("../config/supabase");

exports.signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields",
      });
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    const authUserId = data.user.id;
    const { error: employeeError } = await supabase
      .from("employees")
      .insert({
        auth_user_id: authUserId,
        full_name: fullname,
      });
    if (employeeError) {
      return res.status(400).json({
        success: false,
        message: employeeError.message,
      });
    }
    return res.status(201).json({
      success: true,
      message: "User registered successfully, Please check your email for verification",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  signup,
};
