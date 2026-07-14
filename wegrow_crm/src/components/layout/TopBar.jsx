import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Bell, Search, Menu } from "lucide-react";
import GradientText from "../ui/GradientText";
import Avatar from "../ui/Avatar";
import { useAuth } from "../../context/AuthProvider";
import { useSelector, useDispatch } from "react-redux";
import { markNotificationsReadAsync } from "../../store/notification/notificationThunk";

const PAGE_TITLES = {
  "/": "Dashboard",
  "/leads": "Leads",
  "/leads/new": "Add New Lead",
  "/clients": "Clients",
  "/settings": "Settings",
};

function getTitle(pathname) {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  if (pathname.startsWith("/leads/") && pathname !== "/leads/new")
    return "Lead Details";
  if (pathname.startsWith("/clients/")) return "Client Profile";
  return "WeGrow CRM";
}

export default function TopBar({ onMenuClick }) {
  const { pathname } = useLocation();
  const [showNotif, setShowNotif] = useState(false);
  const { user } = useAuth();
  const { notifications, readNotifications, error } = useSelector(
    (state) => state.notifications,
  );
  const dispatch = useDispatch();
  const toggleNotif = async () => {
    if (showNotif) {
      setShowNotif(false);
      if (notifications.length > 0) {
        dispatch(markNotificationsReadAsync(notifications));
      }
      return;
    }
    setShowNotif(true);
  };

  return (
    <header className="h-16 bg-[#fdf7ff]/90 backdrop-blur-md border-b border-[#e6e0e9] flex items-center px-6 gap-4 sticky top-0 z-10">
      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-[#49454f] hover:bg-[#6750a4]/8 transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Page title */}
      <div className="flex-1">
        <h1 className="text-[18px] font-semibold text-[#1d1b20] leading-none">
          {getTitle(pathname)}
        </h1>
        <p className="text-[11px] text-[#7a7582] mt-0.5 tracking-[0.5px]">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      {user.role==="admin" ? (
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
          <GradientText
            colors={["#5227FF", "#FF9FFC", "#B497CF"]}
            animationSpeed={8}
            showBorder={true}
            className="custom-class"
          >
            Admin
          </GradientText>
        </div>
      ) : null}

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={toggleNotif}
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#49454f] hover:bg-[#6750a4]/8 transition-colors relative"
        >
          <Bell size={20} />
          {notifications.length > 0 && (
            <span className="absolute top-1 right-1 min-w-4 h-4 px-1 flex items-center justify-center bg-[#6750a4] text-white text-[10px] font-medium rounded-full">
              {notifications.length}
            </span>
          )}
        </button>
        {showNotif && (
          <div className="absolute right-0 top-12 w-72 bg-[#ece6ee] rounded-2xl shadow-xl border border-[#e6e0e9] z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-[#e6e0e9]">
              <p className="text-[13px] font-semibold text-[#1d1b20]">
                Notifications
              </p>
            </div>
            {error && (
              <p className="px-4 py-2 text-[13px] text-[#1d1b20]">
                Could not fetch notifications, refresh page
              </p>
            )}
            {notifications.length > 0 && !error && (
              <div className="py-2">
                {notifications.map((n, i) => (
                  <div
                    key={i}
                    className="px-4 py-3 hover:bg-[#6750a4]/8 cursor-pointer transition-colors"
                  >
                    <p className="text-[13px] text-[#1d1b20]">{n.message}</p>
                    <p className="text-[11px] text-[#7a7582] mt-0.5">
                      {`${new Date(n.created_at).toLocaleDateString(
                        "en-IN",
                      )}, ${new Date(n.created_at).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {readNotifications.length > 0 && !error && (
              <div className="py-2">
                <div className="flex items-center px-4 py-2">
                  <div className="flex-grow border-t border-[#e6e0e9]"></div>
                  <span className="px-3 text-[11px] font-medium text-[#7a7582] uppercase tracking-wider">
                    Read
                  </span>
                  <div className="flex-grow border-t border-[#e6e0e9]"></div>
                </div>
                {readNotifications.map((n, i) => (
                  <div
                    key={i}
                    className="px-4 py-3 hover:bg-[#6750a4]/8 cursor-pointer transition-colors"
                  >
                    <p className="text-[13px] text-[#1d1b20]">{n.message}</p>
                    <p className="text-[11px] text-[#7a7582] mt-0.5">
                      {`${new Date(n.created_at).toLocaleDateString(
                        "en-IN",
                      )}, ${new Date(n.created_at).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {notifications.length === 0 &&
              readNotifications.length === 0 &&
              !error && (
                <p className="px-4 py-2 text-[13px] text-[#1d1b20]">
                  No notifications
                </p>
              )}
          </div>
        )}
      </div>

      {/* Avatar */}
      <Avatar
        initials={user.fullname
          .split(" ")
          .map((word) => word[0])
          .join("")}
        size="md"
        color="primary"
      />
    </header>
  );
}
