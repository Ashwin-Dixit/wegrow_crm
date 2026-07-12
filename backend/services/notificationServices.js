const supabase = require("../config/supabase");

const createNotification = async ({
  title,
  message,
  type,
}) => {
  const { error } = await supabase
    .from("notifications")
    .insert({
      title,
      message,
      type,
    });

  if (error) {
    console.log(error)
  }
};

module.exports = {
  createNotification,
};