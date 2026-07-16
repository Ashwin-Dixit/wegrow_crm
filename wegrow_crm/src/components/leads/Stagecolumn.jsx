import react from "react"
import { useDroppable } from "@dnd-kit/core";
import LeadCard from "./LeadCard"
const Stagecolumn = ({ stage, leads }) => {
    const { setNodeRef } = useDroppable({
    id: stage,
  });
    return (
        <div ref={setNodeRef} className="flex-shrink-0 w-80 bg-[#f8f5fa] rounded-xl flex flex-col h-full border border-[#e6e0e9]">
            <div className="p-4 border-b border-[#e6e0e9] bg-[#f2ecf4] rounded-t-xl">
                <h3 className="font-semibold text-[#1d1b20]">{stage} <span className="text-[#7a7582] text-[13px] font-normal ml-1">({leads.length})</span></h3>
            </div>
            <div className="p-3 flex-1 overflow-y-auto flex flex-col gap-3">
                {leads.map((lead) => (
                    <LeadCard key={lead.id} lead={lead} />
                ))}
            </div>
        </div>
    )
}
export default Stagecolumn