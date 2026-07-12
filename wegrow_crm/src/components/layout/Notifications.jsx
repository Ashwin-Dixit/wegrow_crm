import supabase from "../../lib/supabase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {fetchNotificationsAsync} from "../../store/notification/notificationThunk";
import {notificationActions} from "../../store/notification/notificationSlice";

const Notifications = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNotificationsAsync());

    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
        },
        (payload) => {
          dispatch(notificationActions.addNotification(payload.new));
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [dispatch]);

  return null
};

export default Notifications
