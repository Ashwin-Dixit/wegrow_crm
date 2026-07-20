import React from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Phone, Mail, Calendar } from "lucide-react";
import Badge from "../ui/Badge";
import Avatar from "../ui/Avatar";

function formatCurrency(val) {
  if (val >= 1000000) return `₹${(val / 1000000).toFixed(2)}M`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(0)}K`;
  return `₹${val}`;
}

export default function ClientCard({ client }) {
  const navigate = useNavigate();
  const initials = client.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      onClick={() => navigate(`/clients/${client.id}`)}
      className="bg-[#f8f2fa] elevation-1 rounded-2xl p-5 hover:elevation-2 hover:-translate-y-0.5 cursor-pointer transition-all duration-200 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar initials={initials} size="lg" color="auto" />
          <div>
            <p className="text-[15px] font-semibold text-[#1d1b20] group-hover:text-[#4f378a] transition-colors">
              {client.name}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Building2 size={12} className="text-[#7a7582]" />
              <p className="text-[12px] text-[#7a7582]">{client.company}</p>
            </div>
          </div>
        </div>
        <Badge label={client.status} showDot />
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-[12px] text-[#49454f]">
          <Mail size={13} className="text-[#7a7582] shrink-0" />
          <span className="truncate">{client.email}</span>
        </div>
        <div className="flex items-center gap-2 text-[12px] text-[#49454f]">
          <Phone size={13} className="text-[#7a7582] shrink-0" />
          <span>{client.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-[12px] text-[#49454f]">
          <Calendar size={13} className="text-[#7a7582] shrink-0" />
          <span>
            Contract ends{" "}
            {`${new Date(client.contractEnd).toLocaleDateString(
              "en-IN",
            )}, ${new Date(client.contractEnd).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}`}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#e6e0e9] pt-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-[#7a7582] uppercase tracking-[0.5px]">
            Contract Value
          </p>
          <p className="text-[16px] font-bold text-[#4f378a]">
            {formatCurrency(client.contractValue)}
          </p>
        </div>
      </div>
    </div>
  );
}
