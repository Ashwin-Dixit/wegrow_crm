import react from "react";
import { useDraggable } from "@dnd-kit/core";
import Avatar from "../ui/Avatar";

const LeadCard = ({ lead, isOverlay }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: lead.id,
    disabled: isOverlay,
  });

  return (
    <div
      ref={!isOverlay ? setNodeRef : undefined}
      {...(!isOverlay ? listeners : {})}
      {...(!isOverlay ? attributes : {})}
      className={`bg-white p-3 rounded-lg border shadow-sm transition-all cursor-pointer group ${
        isOverlay
          ? "shadow-2xl cursor-grabbing rotate-2 border-[#cbc4d2] ring-2 ring-[#4f378a]/20"
          : isDragging
          ? "opacity-40 border-dashed border-2 border-[#cbc4d2] bg-[#f8f5fa]"
          : "border-[#e6e0e9] hover:border-[#cbc4d2] hover:shadow-md"
      }`}
    >
      <div className={`flex items-center gap-3 ${isDragging && !isOverlay ? "opacity-0" : ""}`}>
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
    </div>
  );
};
export default LeadCard;
