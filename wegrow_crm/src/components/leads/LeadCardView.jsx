import React from "react";
import Avatar from "../ui/Avatar";

const LeadCardView = ({ lead }) => {
  return (
    <div
      className="
        bg-white
        p-3
        rounded-lg
        border
        border-[#e6e0e9]
        shadow-sm
        hover:shadow-md
        hover:border-[#cbc4d2]
        transition-all
        cursor-pointer
        group
      "
    >
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

          <p className="text-[12px] text-[#7a7582]">
            {lead.company}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadCardView;