import react from "react";
import { useDraggable } from "@dnd-kit/core";
import Avatar from "../ui/Avatar";
import LeadCardView from "./LeadCardView";

const LeadCard = ({ lead}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: lead.id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,

    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}>
      <LeadCardView lead={lead}/>
    </div>
  );
};
export default LeadCard;
