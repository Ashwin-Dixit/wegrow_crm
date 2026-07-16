import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import Stagecolumn from "../components/leads/Stagecolumn";
import LeadCard from "../components/leads/LeadCard";

const LeadPipelinePage = () => {
  const { leads } = useSelector((state) => state.leads);
  const [activeId, setActiveId] = useState(null);

  const newLeads = useMemo(() => {
    const array = leads.filter((l) => l.status.toLowerCase() === "new");
    return array;
  }, [leads]);
  const contactedLeads = useMemo(() => {
    const array = leads.filter((l) => l.status.toLowerCase() === "contacted");
    return array;
  }, [leads]);
  const qualifiedLeads = useMemo(() => {
    const array = leads.filter((l) => l.status.toLowerCase() === "qualified");
    return array;
  }, [leads]);
  const wonLeads = useMemo(() => {
    const array = leads.filter((l) => l.status.toLowerCase() === "won");
    return array;
  }, [leads]);
  const lostLeads = useMemo(() => {
    const array = leads.filter((l) => l.status.toLowerCase() === "lost");
    return array;
  }, [leads]);

  const LEAD_STAGE = [
    { stage: "New", leads: newLeads },
    { stage: "Contacted", leads: contactedLeads },
    { stage: "Qualified", leads: qualifiedLeads },
    { stage: "Won", leads: wonLeads },
    { stage: "Lost", leads: lostLeads },
  ];
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    setActiveId(null);
    console.log(event);
    const { active, over } = event;
    if (!over) return;

    console.log("Lead:", active.id);

    console.log("Dropped into:", over.id);
  };

  const activeLead = useMemo(() => {
    if (!activeId) return null;
    return leads.find(l => l.id === activeId);
  }, [activeId, leads]);

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-4 h-[calc(100vh-120px)] items-start">
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          {LEAD_STAGE.map((s, idx) => (
            <Stagecolumn key={idx} stage={s.stage} leads={s.leads} />
          ))}
          <DragOverlay>
            {activeLead ? <LeadCard lead={activeLead} isOverlay={true} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
};
export default LeadPipelinePage;
