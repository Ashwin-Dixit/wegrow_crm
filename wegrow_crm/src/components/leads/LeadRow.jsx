import React from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Mail, MoreVertical } from "lucide-react";
import Badge from "../ui/Badge";
import Avatar from "../ui/Avatar";

function formatCurrency(val) {
  if (val >= 1000000) return `₹${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(0)}K`;
  return `₹${val}`;
}

export default function LeadRow({ lead }) {
  const navigate = useNavigate();

  return (
    <tr
      onClick={() => navigate(`/leads/${lead.id}`)}
      className="border-b border-[#e6e0e9] hover:bg-[#6750a4]/5 cursor-pointer transition-colors group"
    >
      {/* Name + Company */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
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
            <p className="text-[14px] font-medium text-[#1d1b20] group-hover:text-[#4f378a] transition-colors">
              {lead.name}
            </p>
            <p className="text-[12px] text-[#7a7582]">{lead.company}</p>
          </div>
        </div>
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <Badge label={lead.status} showDot />
      </td>

      {/* Source */}
      <td className="px-4 py-3">
        <span className="text-[13px] text-[#49454f]">{lead.source}</span>
      </td>

      {/* Value */}
      <td className="px-4 py-3">
        <span className="text-[14px] font-semibold text-[#4f378a]">
          {formatCurrency(0)}
        </span>
      </td>

      {/* Assigned To */}
      <td className="px-4 py-3">
        <span className="text-[13px] text-[#49454f]">{lead.assignedTo}</span>
      </td>

      {/* Last Contact */}
      <td className="px-4 py-3">
        <span className="text-[12px] text-[#7a7582]">{`${new Date(
          lead.updatedAt,
        ).toLocaleDateString("en-IN")}, ${new Date(
          lead.updatedAt,
        ).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        })}`}</span>
      </td>

      {/* Actions */}
      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <a
            href={`tel:${lead.phone}`}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#7a7582] hover:bg-[#e8def9] hover:text-[#4f378a] transition-colors"
            title="Call"
          >
            <Phone size={14} />
          </a>
          <a
            href={`mailto:${lead.email}`}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#7a7582] hover:bg-[#e8def9] hover:text-[#4f378a] transition-colors"
            title="Email"
          >
            <Mail size={14} />
          </a>
        </div>
      </td>
    </tr>
  );
}
