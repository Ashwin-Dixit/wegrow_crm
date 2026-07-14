const supabase = require("../config/supabase");

const createNotification = async ({ title, message, type }) => {
  try {
    const { error } = await supabase.from("notifications").insert({
      title,
      message,
      type,
    });

    if (error) {
      console.log(error);
    }
  } catch (error) {
    console.log("Error in creating notification ", error);
  }
};

module.exports = {
  createNotification,
};
