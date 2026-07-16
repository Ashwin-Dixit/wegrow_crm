import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  PlusCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Zap,
  FileText,
  Contact,
} from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  {
    id: "leads",
    icon: Users,
    label: "Leads",
    subItems: [
      { to: "/leads", label: "All Leads" },
      { to: "/leads/pipeline", label: "Leads Pipeline"},
      { to: "/leads/new", label: "Add Lead" },
    ],
  },
  { to: "/clients", icon: UserCheck, label: "Clients" },
   {to: "/contact", icon: Contact, label: "Contacts"},
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [openDropdowns, setOpenDropdowns] = useState({ leads: false });

  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLogout = async () => {
    const data = await logout();
    navigate("/login");
  };

  return (
    <aside
      className={`
         pt-4 h-screen sticky top-0 flex flex-col bg-gray-200 border-r border-[#e6e0e9]
        sidebar-transition z-20 shrink-0
        ${collapsed ? "w-20" : "w-[280px]"}`}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 ${collapsed ? "px-2" : "px-5"} h-16 border-b border-[#e6e0e9] shrink-0`}>
        <div className={`rounded-xl flex items-center justify-center shrink-0 ${collapsed ? "w-16 h-16" : "w-24 h-24"}`}>
          <img alt="logo" src="/wegrowfooterlogo.png" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-[15px] font-bold text-[#1d1b20] leading-none">
              WeGrow
            </p>
            <p className="text-[11px] text-[#7a7582] mt-0.5 tracking-[0.5px]">
              CRM Platform
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
        {!collapsed && (
          <p className="text-[10px] font-semibold text-[#7a7582] uppercase tracking-[1px] px-3 mb-3">
            Main Menu
          </p>
        )}

        {navItems.map((item) => {
          if (item.subItems) {
            const isOpen = openDropdowns[item.id];
            return (
              <div key={item.id} className="space-y-1">
                <button
                  onClick={() => toggleDropdown(item.id)}
                  className={[
                    "w-full flex items-center justify-between px-3 h-12 rounded-full transition-all duration-200 group",
                    "text-[14px] font-medium text-[#49454f] hover:bg-[#6750a4]/8 hover:text-[#4f378a]",
                    collapsed ? "justify-center" : "",
                  ].join(" ")}
                  title={collapsed ? item.label : undefined}
                >
                  <div className="flex items-center gap-3">
                    <item.icon
                      size={20}
                      className="text-[#49454f] group-hover:text-[#4f378a]"
                    />
                    {!collapsed && <span>{item.label}</span>}
                  </div>
                  {!collapsed && (
                    <ChevronRight
                      size={16}
                      className={`text-[#7a7582] transition-transform duration-200 ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    />
                  )}
                </button>
                {isOpen && !collapsed && (
                  <div className="pl-11 pr-3 space-y-1">
                    {item.subItems.map((subItem) => (
                      <NavLink
                        key={subItem.to}
                        to={subItem.to}
                        end={subItem.to === "/leads"}
                        className={({ isActive }) =>
                          [
                            "flex items-center px-4 h-10 rounded-full transition-all duration-200",
                            "text-[13px] font-medium",
                            isActive
                              ? "bg-[#21467a] text-white"
                              : "text-[#49454f] hover:bg-[#6750a4]/8 hover:text-[#4f378a]",
                          ].join(" ")
                        }
                      >
                        {subItem.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 px-3 h-12 rounded-full transition-all duration-200 group",
                  "text-[14px] font-medium",
                  isActive
                    ? "bg-[#21467a] text-white"
                    : "text-[#49454f] hover:bg-[#6750a4]/8 hover:text-[#4f378a]",
                  collapsed ? "justify-center" : "",
                ].join(" ")
              }
              title={collapsed ? item.label : undefined}
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    size={20}
                    className={
                      isActive
                        ? "text-[#4f378a]"
                        : "text-[#49454f] group-hover:text-[#4f378a]"
                    }
                  />
                  {!collapsed && <span>{item.label}</span>}
                </>
              )}
            </NavLink>
          );
        })}
        {!collapsed && (
          <p className="text-[10px] font-semibold text-[#7a7582] uppercase tracking-[1px] px-3 mt-6 mb-3">
            Invoice
          </p>
        )}

        <a
          href="https://wegrowconsultancyandsolution.in/invoice/index.php/sessions/login"
          target="_blank"
          rel="noopener noreferrer"
          className={[
            "flex items-center gap-3 px-3 h-12 rounded-full transition-all duration-200 group",
            "text-[14px] font-medium",
            "text-[#49454f] hover:bg-[#6750a4]/8 hover:text-[#4f378a]",
            collapsed ? "justify-center" : "",
          ].join(" ")}
          title={collapsed ? "Invoices" : undefined}
        >
          <FileText
            size={20}
            className="text-[#49454f] group-hover:text-[#4f378a]"
          />
          {!collapsed && <span>Invoices</span>}
        </a>

        {/* {!collapsed && (
          <p className="text-[10px] font-semibold text-[#7a7582] uppercase tracking-[1px] px-3 mt-6 mb-3">
            Account
          </p>
        )}

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            [
              "flex items-center gap-3 px-3 h-12 rounded-full transition-all duration-200 group",
              "text-[14px] font-medium",
              isActive
                ? "bg-[#e8def9] text-[#4f378a]"
                : "text-[#49454f] hover:bg-[#6750a4]/8 hover:text-[#4f378a]",
              collapsed ? "justify-center" : "",
            ].join(" ")
          }
          title={collapsed ? "Settings" : undefined}
        >
          {({ isActive }) => (
            <>
              <Settings
                size={20}
                className={
                  isActive
                    ? "text-[#4f378a]"
                    : "text-[#49454f] group-hover:text-[#4f378a]"
                }
              />
              {!collapsed && <span>Settings</span>}
            </>
          )}
        </NavLink> */}
      </nav>

      {/* Bottom: User + Collapse */}
      <div className="border-t border-[#e6e0e9] p-3 space-y-2 shrink-0">
        {/* User Row */}
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-2 rounded-full hover:bg-[#6750a4]/8 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#e9ddff] flex items-center justify-center text-[12px] font-semibold text-[#4f378a] shrink-0">
              {user.fullname.split(" ").map(word => word[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-bold text-[#5959ab] truncate">
                {user.fullname}
              </p>
              <p className="text-[11px] text-[#7a7582] truncate">{user.role}</p>
              <p className="text-[13px] font-semibold text-[#1d1b20] truncate">
                {user.email}
              </p>
            </div>
            <LogOut
              size={16}
              className="text-[#7a7582] hover:text-[#ba1a1a] shrink-0 cursor-pointer"
              onClick={handleLogout}
              title="Logout"
            />
          </div>
        )}

        {/* Collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={[
            "flex items-center justify-center w-full h-10 rounded-full",
            "text-[#7a7582] hover:bg-[#6750a4]/8 hover:text-[#4f378a] transition-colors",
          ].join(" ")}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </aside>
  );
}
