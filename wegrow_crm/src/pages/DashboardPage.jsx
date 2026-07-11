import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  UserCheck,
  IndianRupee,
  Target,
  TrendingUp,
  Calendar,
  Activity,
  PhoneCall,
  Mail,
  StickyNote,
} from "lucide-react";
import StatCard from "../components/ui/StatCard";
import Card, { CardHeader } from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";
import { mockStats, mockActivities, mockTeamMembers } from "../data/mockData";
import { useAuth } from "../context/AuthProvider";
import { useSelector } from "react-redux";

function formatCurrency(val) {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
  if (val >= 1000000) return `₹${(val / 1000000).toFixed(2)}M`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(0)}K`;
  return `₹${val}`;
}

const ACTIVITY_ICONS = {
  call: { icon: PhoneCall, color: "text-[#00531b] bg-[#c2e7d0]" },
  email: { icon: Mail, color: "text-[#4f378a] bg-[#e8def9]" },
  meeting: { icon: Calendar, color: "text-[#7a3a00] bg-[#ffefd6]" },
  note: { icon: StickyNote, color: "text-[#625b71] bg-[#e8def9]" },
  won: { icon: Target, color: "text-[#00531b] bg-[#c2e7d0]" },
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { leads } = useSelector((state) => state.leads);
  const {clients} = useSelector((state)=>state.clients)
  const recentLeads = leads?.slice(0, 5) || [];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[24px] font-semibold text-[#1d1b20]">
            Good morning, {user.fullname}! 👋
          </h2>
          <p className="text-[14px] text-[#7a7582] mt-1">
            Here's what's happening with your pipeline today.
          </p>
        </div>
        <Button
          variant="filled"
          onClick={() => navigate("/leads/new")}
          icon={<Users size={16} />}
        >
          Add Lead
        </Button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Leads"
          value={leads.length}
          subValue={`+${leads.length} this month`}
          trend="up"
          trendLabel="12% vs last month"
          icon={Users}
          color="primary"
        />
        <StatCard
          label="Active Clients"
          value={clients.filter((c)=>c.status==="active")?.length }
          subValue={`${clients.filter((c)=>c.status==="renewal")?.length} renewal due`}
          trend="neutral"
          trendLabel="Stable"
          icon={UserCheck}
          color="success"
        />
        <StatCard
          label="Total Contract Value"
          value={formatCurrency(clients?.reduce((acc,curr)=>acc+(curr.contractValue || 0),0))}
          subValue="Open opportunities"
          trend="up"
          trendLabel="₹4.82M open"
          icon={IndianRupee}
          color="warning"
        />
        <StatCard
          label="Win Rate"
          value={`${mockStats.winRate}%`}
          subValue={`Avg deal: ${formatCurrency(mockStats.avgDealSize)}`}
          trend="up"
          trendLabel="Up from 11.2%"
          icon={Target}
          color="secondary"
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Leads Table */}
        <div className="xl:col-span-2">
          <Card elevation={1} padding="p-0">
            <CardHeader
              title="Recent Leads"
              subtitle="Latest pipeline activity"
              action={
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/leads")}
                >
                  View all
                </Button>
              }
              className="px-6 pt-6"
            />
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#e6e0e9]">
                    {[
                      "Lead",
                      "Status",
                      "Value",
                      "Assigned",
                      "Last Contact",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-[11px] font-semibold text-[#7a7582] uppercase tracking-[0.5px]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => navigate(`/leads/${lead.id}`)}
                      className="border-b border-[#e6e0e9] last:border-0 hover:bg-[#6750a4]/5 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Avatar
                            initials={lead.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                            size="sm"
                            color="auto"
                          />
                          <div>
                            <p className="text-[13px] font-medium text-[#1d1b20]">
                              {lead.name}
                            </p>
                            <p className="text-[11px] text-[#7a7582]">
                              {lead.company}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge label={lead.status} showDot />
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[13px] font-semibold text-[#4f378a]">
                          {formatCurrency(0)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[12px] text-[#49454f]">
                          {lead.assignedTo}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[12px] text-[#7a7582]">
                          {`${new Date(lead.updatedAt).toLocaleDateString(
                            "en-IN",
                          )}, ${new Date(lead.updatedAt).toLocaleTimeString(
                            "en-IN",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}`}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Activity Feed */}
          {/* <Card elevation={1}>
            <CardHeader title="Recent Activity" subtitle="Team updates" />
            <div className="space-y-3">
              {mockActivities.map((act) => {
                const meta = ACTIVITY_ICONS[act.type] ?? ACTIVITY_ICONS.note;
                const Icon = meta.icon;
                return (
                  <div key={act.id} className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${meta.color}`}
                    >
                      <Icon size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] text-[#1d1b20] leading-5">
                        {act.text}
                      </p>
                      <p className="text-[11px] text-[#7a7582] mt-0.5">
                        {act.user} · {act.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card> */}

          {/* Team Performance */}
          {/* <Card elevation={1}>
            <CardHeader title="Team Performance" subtitle="This quarter" />
            <div className="space-y-3">
              {mockTeamMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  <Avatar initials={member.avatar} size="sm" color="primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-[#1d1b20]">
                      {member.name}
                    </p>
                    <p className="text-[11px] text-[#7a7582]">{member.role}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[13px] font-semibold text-[#4f378a]">
                      {member.leads} leads
                    </p>
                    <p className="text-[11px] text-[#00531b]">
                      {member.won} won
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card> */}
        </div>
      </div>
    </div>
  );
}
