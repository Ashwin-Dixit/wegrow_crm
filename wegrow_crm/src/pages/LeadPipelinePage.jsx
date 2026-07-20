import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import Stagecolumn from "../components/leads/Stagecolumn";
import LeadCard from "../components/leads/LeadCard";
import LeadCardView from "@/components/leads/LeadCardView";
import { leadActions } from "../store/lead/leadSlice";
import { useDispatch } from "react-redux";
import { updateLeadThunk } from "@/store/lead/leadThunks";

const LeadPipelinePage = () => {
  const { leads } = useSelector((state) => state.leads);
  const sortedLeads = useMemo(() => {
    const array = [...leads].sort((l, m) => new Date(m.updatedAt) - new Date(l.updatedAt));
    return array;
  }, [leads]);
  const dispatch = useDispatch();

  const newLeads = useMemo(() => {
    const array = sortedLeads.filter((l) => l.status.toLowerCase() === "new");
    return array;
  }, [sortedLeads]);
  const contactedLeads = useMemo(() => {
    const array = sortedLeads.filter(
      (l) => l.status.toLowerCase() === "contacted",
    );
    return array;
  }, [sortedLeads]);
  const qualifiedLeads = useMemo(() => {
    const array = sortedLeads.filter((l) => l.status.toLowerCase() === "qualified");
    return array;
  }, [sortedLeads]);
  const proposalLeads = useMemo(() => {
    const array = sortedLeads.filter((l) => l.status.toLowerCase() === "proposal");
    return array;
  }, [sortedLeads]);
  const wonLeads = useMemo(() => {
    const array = sortedLeads.filter((l) => l.status.toLowerCase() === "won");
    return array;
  }, [sortedLeads]);
  const lostLeads = useMemo(() => {
    const array = sortedLeads.filter((l) => l.status.toLowerCase() === "lost");
    return array;
  }, [sortedLeads]);

  const LEAD_STAGE = [
    { stage: "New", leads: newLeads },
    { stage: "Contacted", leads: contactedLeads },
    { stage: "Qualified", leads: qualifiedLeads },
    {stage: "Proposal", leads: proposalLeads},
    { stage: "Won", leads: wonLeads },
    { stage: "Lost", leads: lostLeads },
  ];
  const [activeLead, setActiveLead] = useState(null);
  const handleDragStart = (event) => {
    setActiveLead(leads.find((l) => l.id === event.active.id));
  };
  const handleDragEnd = (event) => {
    setActiveLead(null);
    const { active, over } = event;
    if (!over) return;
    const leadId = active.id;
    const newStatus = over.id.toLowerCase();
    dispatch(leadActions.moveStatus({ leadId, newStatus }));
    dispatch(updateLeadThunk({ leadId, updates: { status: newStatus } }));
  };

  return (
    <>
      <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <div className="flex gap-4 overflow-x-auto pb-4 h-[calc(100vh-120px)] items-start">
          {LEAD_STAGE.map((s, idx) => (
            <Stagecolumn key={idx} stage={s.stage} leads={s.leads} />
          ))}
        </div>
        <DragOverlay>
          {activeLead && <LeadCardView lead={activeLead} />}
        </DragOverlay>
      </DndContext>
    </>
  );
};
export default LeadPipelinePage;
