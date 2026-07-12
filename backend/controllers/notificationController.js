const supabase = require("../config/supabase");

exports.fetchNotifications = async (req, res, next) => {
  try {
    const { data: readNotifications, error: readError } = await supabase
      .from("notification_reads")
      .select("notification_id")
      .eq("user_id", req.user.id);

    if (readError) {
      return res.status(400).json({
        success: false,
        message: readError.message,
      });
    }

    const readIds = readNotifications.map((item) => item.notification_id);

    let query = supabase
      .from("notifications")
      .select("*")
      .order("created_at", {
        ascending: false,
      })
      .limit(50);

    if (readIds.length > 0) {
      query = query.not("id", "in", `(${readIds.join(",")})`);
    }

    const { data: notifications, error } = await query;

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.markNotificationsRead = async (req, res) => {
  try {
    const { notificationIds } = req.body;

    if (
      !Array.isArray(notificationIds) ||
      notificationIds.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Notification ids are required",
      });
    }

    const records = notificationIds.map(
      (notificationId) => ({
        notification_id: notificationId,
        user_id: req.user.id,
      })
    );

    const { error } = await supabase
      .from("notification_reads")
      .upsert(records, {
        onConflict: "notification_id,user_id",
      });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notifications marked as read",
      notificationIds,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
