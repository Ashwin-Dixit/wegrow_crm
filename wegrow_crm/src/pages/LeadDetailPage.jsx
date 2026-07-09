import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteLeadThunk } from "../store/lead/leadThunks";
import {
  ArrowLeft,
  Phone,
  Mail,
  Building2,
  Calendar,
  User,
  Tag,
  DollarSign,
  Edit2,
  Trash2,
  CheckCircle,
} from "lucide-react";
import { useLeads } from "../hooks/useLeads";
import Badge from "../components/ui/Badge";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";
import Card, { CardHeader } from "../components/ui/Card";
import Modal from "../components/ui/Modal";
import { LEAD_STATUSES } from "../data/mockData";

function formatCurrency(val) {
  return `₹${val.toLocaleString("en-IN")}`;
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-[#e6e0e9] last:border-0">
      <div className="w-8 h-8 rounded-full bg-[#e8def9] flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={14} className="text-[#4f378a]" />
      </div>
      <div>
        <p className="text-[11px] font-medium text-[#7a7582] uppercase tracking-[0.5px]">
          {label}
        </p>
        <p className="text-[14px] text-[#1d1b20] mt-0.5">{value}</p>
      </div>
    </div>
  );
}

export default function LeadDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { leads, loading } = useSelector((state) => state.leads);
  const dispatch = useDispatch()
  const { getLeadById, updateLeadStatus, deleteLead } = useLeads();
  const [deleteModal, setDeleteModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [deleting, setDeleting] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState(false)

  const lead = getLeadById(id);

  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-20 h-20 rounded-full bg-[#ffdad6] flex items-center justify-center">
          <User size={32} className="text-[#93000a]" />
        </div>
        <p className="text-[18px] font-semibold text-[#1d1b20]">
          Lead not found
        </p>
        <Button variant="tonal" onClick={() => navigate("/leads")}>
          Back to Leads
        </Button>
      </div>
    );
  }

  const handleDelete = async () => {
    setDeleting(true)
    await dispatch(deleteLeadThunk(id))
    setDeleting(false)
    setDeleteModal(false)
    navigate("/leads");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back + Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/leads")}
          className="flex items-center gap-2 text-[#6750a4] hover:text-[#4f378a] text-[14px] font-medium transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Leads
        </button>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="sm"
            icon={<Edit2 size={14} />}
            onClick={() => navigate(`/leads/new?edit=${id}`)}
          >
            Edit
          </Button>
          <Button
            variant="danger-tonal"
            size="sm"
            icon={<Trash2 size={14} />}
            onClick={() => setDeleteModal(true)}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Hero Card */}
      <Card elevation={1}>
        <div className="flex flex-wrap items-start gap-6">
          <Avatar
            initials={lead.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
            size="lg"
            color="primary"
          />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h2 className="text-[22px] font-bold text-[#1d1b20]">
                {lead.name}
              </h2>
              <Badge label={lead.status} showDot />
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-[13px] text-[#49454f]">
              <span className="flex items-center gap-1.5">
                <Building2 size={13} className="text-[#7a7582]" />
                {lead.company}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail size={13} className="text-[#7a7582]" />
                {lead.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone size={13} className="text-[#7a7582]" />
                {lead.phone}
              </span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[11px] text-[#7a7582] uppercase tracking-[0.5px]">
              Deal Value
            </p>
            <p className="text-[28px] font-bold text-[#4f378a] leading-none mt-1">
              {formatCurrency(0)}
            </p>
          </div>
        </div>

        {/* Status Pipeline */}
        <div className="mt-6 pt-6 border-t border-[#e6e0e9]">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[12px] font-semibold text-[#7a7582] uppercase tracking-[0.5px]">
              Pipeline Stage
            </p>
            <Button
              variant="ghost"
              size="sm"
              icon={<CheckCircle size={14} />}
              onClick={() => setStatusModal(true)}
            >
              Update Status
            </Button>
          </div>
          <div className="flex gap-1 overflow-x-auto pb-1">
            {LEAD_STATUSES.map((s, i) => {
              const currentIdx = LEAD_STATUSES.indexOf(lead.status);
              const isActive = i === currentIdx;
              const isPast = i < currentIdx;
              return (
                <div
                  key={s}
                  className={[
                    "flex-1 min-w-[80px] h-2 rounded-full transition-all duration-300",
                    isActive
                      ? "bg-[#6750a4]"
                      : isPast
                        ? "bg-[#c2e7d0]"
                        : "bg-[#e6e0e9]",
                  ].join(" ")}
                  title={s}
                />
              );
            })}
          </div>
          <div className="flex justify-between mt-1">
            {LEAD_STATUSES.map((s) => (
              <span
                key={s}
                className={`text-[10px] ${s === lead.status ? "text-[#4f378a] font-semibold" : "text-[#7a7582]"}`}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </Card>

      {/* Detail Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card elevation={1}>
          <CardHeader title="Lead Details" />
          <InfoRow icon={Tag} label="Source" value={lead.source} />
          <InfoRow icon={Building2} label="Industry" value={lead.industry} />
          <InfoRow icon={User} label="Assigned To" value={lead.assignedTo} />
          <InfoRow
            icon={Calendar}
            label="Created"
            value={`${new Date(lead.createdAt).toLocaleDateString(
              "en-IN",
            )}, ${new Date(lead.createdAt).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}`}
          />
          <InfoRow
            icon={Calendar}
            label="Last Contact"
            value={`${new Date(lead.updatedAt).toLocaleDateString(
              "en-IN",
            )}, ${new Date(lead.updatedAt).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}`}
          />
        </Card>

        <Card elevation={1}>
          <CardHeader title="Notes" />
          <div className="bg-[#f2ecf4] rounded-xl p-4">
            <p className="text-[14px] text-[#49454f] leading-6 whitespace-pre-wrap">
              {lead.notes || "No notes added."}
            </p>
          </div>

          {/* Quick Contact */}
          <div className="mt-4 flex gap-2">
            <a href={`tel:${lead.phone}`} className="flex-1">
              <Button
                variant="tonal"
                size="md"
                className="w-full"
                icon={<Phone size={15} />}
              >
                Call
              </Button>
            </a>
            <a href={`mailto:${lead.email}`} className="flex-1">
              <Button
                variant="outlined"
                size="md"
                className="w-full"
                icon={<Mail size={15} />}
              >
                Email
              </Button>
            </a>
          </div>
        </Card>
      </div>

      {/* Status Update Modal */}
      <Modal
        isOpen={statusModal}
        onClose={() => setStatusModal(false)}
        title={updatingStatus? "updating":"Update Lead Status"}
        size="sm"
      >
        <div className="grid grid-cols-2 gap-2">
          {LEAD_STATUSES.map((s) => (
            <button
              key={s}
              onClick={async () => {
                setUpdatingStatus(true)
                await updateLeadStatus(id, s);
                setUpdatingStatus(false)
                setStatusModal(false);
              }}
              className={[
                "px-4 py-3 rounded-xl text-[13px] font-medium transition-all duration-200 text-left",
                lead.status === s
                  ? "bg-[#6750a4] text-white"
                  : "bg-[#f2ecf4] text-[#49454f] hover:bg-[#e8def9] hover:text-[#4f378a]",
              ].join(" ")}
            >
              {s}
              {lead.status === s && <span className="float-right">✓</span>}
            </button>
          ))}
        </div>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Delete Lead"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} disabled={deleting}>
              {deleting ? "Deleting..." : "Delete Lead"}
            </Button>
          </>
        }
      >
        <p className="text-[14px] text-[#49454f]">
          Are you sure you want to delete <strong>{lead.name}</strong> from{" "}
          {lead.company}? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
