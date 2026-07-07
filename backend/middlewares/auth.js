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

    const { data, error } =
      await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    req.user = data.user;

    next();

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};