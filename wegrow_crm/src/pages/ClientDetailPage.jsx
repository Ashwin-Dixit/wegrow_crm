import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Phone,
  Mail,
  Building2,
  Calendar,
  User,
  IndianRupee,
  FileText,
  RefreshCw,
  Folder,
  Edit2,
  Trash2,
  Receipt,
  Plus,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useClients } from "../hooks/useClients";
import Badge from "../components/ui/Badge";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";
import {Select} from "@/components/ui/Input"
import Modal from "@/components/ui/Modal";
import Card, { CardHeader } from "../components/ui/Card";
import Projects from "../components/clients/Projects";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, addProjectThunk } from "../store/project/projectThunk";
import { deleteClientThunk } from "../store/client/clientThunks";
import { useAuth } from "../context/AuthProvider";
import Input from "@/components/ui/Input";
import ProjectAddModal from "@/components/clients/ProjectAddModal";
function formatCurrency(val) {
  return `₹${val}`;
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

export default function ClientDetailPage() {
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [addProjectModal, setAddProjectModal] = useState(false);
  const { id } = useParams();
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  const [fetchingProjects, setFetchingProjects] = useState(false);

  const { user } = useAuth();
  useEffect(() => {
    async function getProjects() {
      setFetchingProjects(true);
      try {
        await dispatch(fetchProjects(id)).unwrap();
      } catch (error) {
        toast.error("Failed to fetch projects");
      } finally {
        setFetchingProjects(false);
      }
    }
    getProjects();
  }, [dispatch, id]);
  const navigate = useNavigate();
  const { getClientById } = useClients();

  const client = getClientById(id);

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-20 h-20 rounded-full bg-[#ffdad6] flex items-center justify-center">
          <User size={32} className="text-[#93000a]" />
        </div>
        <p className="text-[18px] font-semibold text-[#1d1b20]">
          Client not found
        </p>
        <Button variant="tonal" onClick={() => navigate("/clients")}>
          Back to Clients
        </Button>
      </div>
    );
  }

  const totalMonths = (() => {
    const start = new Date(client.contractStart);
    const end = new Date(client.contractEnd);
    return Math.round((end - start) / (1000 * 60 * 60 * 24 * 30));
  })();

  const timeLeft = (() => {
    const now = new Date();
    const end = new Date(client.contractEnd);
    const diffMs = end - now;
    if (diffMs <= 0) return "0 days";

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffDays / 30);
    const days = diffDays % 30;

    if (months > 0 && days > 0) {
      return `${months} month${months > 1 ? "s" : ""} and ${days} day${days !== 1 ? "s" : ""}`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""}`;
    } else {
      return `${days} day${days !== 1 ? "s" : ""}`;
    }
  })();

  const progressPct = Math.min(
    100,
    Math.round(
      ((Math.max(new Date(), new Date(client.contractStart)) -
        new Date(client.contractStart)) /
        (new Date(client.contractEnd) - new Date(client.contractStart))) *
        100,
    ),
  );
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await dispatch(deleteClientThunk(id)).unwrap();
      toast.success("Client deleted successfully");
    } catch (error) {
      toast.error("Failed to delete client");
    } finally {
      setDeleting(false);
      setDeleteModal(false);
      navigate("/clients");
    }
  };
  

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/clients")}
          className="flex items-center gap-2 text-[#6750a4] hover:text-[#4f378a] text-[14px] font-medium transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Clients
        </button>
        {user.role === "admin" ? (
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              icon={<Edit2 size={14} />}
              onClick={() => navigate(`/clients/new?edit=${id}`)}
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
        ) : null}
        {/* <div className="flex gap-2">
          <Button variant="outlined" size="sm" icon={<RefreshCw size={14} />}>
            Schedule Renewal
          </Button>
        </div> */}
      </div>

      {/* Hero */}
      <Card elevation={1}>
        <div className="flex flex-wrap items-start gap-6">
          <Avatar
            initials={client.name
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
                {client.name}
              </h2>
              <Badge label={client.status} showDot />
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-[13px] text-[#49454f]">
              <span className="flex items-center gap-1.5">
                <Building2 size={13} className="text-[#7a7582]" />
                {client.company}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail size={13} className="text-[#7a7582]" />
                {client.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone size={13} className="text-[#7a7582]" />
                {client.phone}
              </span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[11px] text-[#7a7582] uppercase tracking-[0.5px]">
              Contract Value
            </p>
            <p className="text-[28px] font-bold text-[#4f378a] leading-none mt-1">
              {formatCurrency(client.contractValue)}
            </p>
          </div>
        </div>

        {/* Contract Progress */}
        <div className="mt-6 pt-6 border-t border-[#e6e0e9]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[12px] font-semibold text-[#7a7582] uppercase tracking-[0.5px]">
              Contract Progress
            </p>
            <p className="text-[12px] text-[#7a7582]">{timeLeft} Left</p>
          </div>
          <div className="h-2 bg-[#e6e0e9] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#6750a4] rounded-full transition-all duration-700"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[11px] text-[#7a7582]">
              Started{" "}
              {`${new Date(client.contractStart).toLocaleDateString(
                "en-IN",
              )}, ${new Date(client.contractStart).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })}`}
            </span>
            <span className="text-[11px] text-[#7a7582]">
              Ends{" "}
              {`${new Date(client.contractEnd).toLocaleDateString(
                "en-IN",
              )}, ${new Date(client.contractEnd).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })}`}
            </span>
          </div>
        </div>
      </Card>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card elevation={1}>
          <CardHeader title="Account Details" />
          <InfoRow icon={Building2} label="Industry" value={client.industry} />
          <InfoRow
            icon={User}
            label="Account Manager"
            value={client.accountManager}
          />
          <InfoRow
            icon={Calendar}
            label="Contract Start"
            value={`${new Date(client.contractStart).toLocaleDateString(
              "en-IN",
            )}, ${new Date(client.contractStart).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}`}
          />
          <InfoRow
            icon={Calendar}
            label="Contract End"
            value={`${new Date(client.contractEnd).toLocaleDateString(
              "en-IN",
            )}, ${new Date(client.contractEnd).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}`}
          />
        </Card>

        <Card elevation={1}>
          <CardHeader title="Financial Summary" />
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#f2ecf4] rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#e9ddff] flex items-center justify-center">
                  <IndianRupee size={16} className="text-[#4f378a]" />
                </div>
                <div>
                  <p className="text-[11px] text-[#7a7582] uppercase tracking-[0.5px]">
                    Contract Value
                  </p>
                  <p className="text-[18px] font-bold text-[#4f378a]">
                    {formatCurrency(client.contractValue)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#f2ecf4] rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#e9ddff] flex items-center justify-center">
                  <Receipt size={16} className="text-[#4f378a]" />
                </div>
                <div>
                  <p className="text-[11px] text-[#7a7582] uppercase tracking-[0.5px]">
                    GST
                  </p>
                  <p className="text-[18px] font-bold text-[#4f378a]">18%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <a href={`tel:${client.phone}`} className="flex-1">
              <Button
                variant="tonal"
                size="md"
                className="w-full"
                icon={<Phone size={15} />}
              >
                Call
              </Button>
            </a>
            <a href={`mailto:${client.email}`} className="flex-1">
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

      {/* Projects */}
      {/* {client.projects && client.projects.length > 0 && ( */}
      <Card elevation={1} className="bg-gray-200 mt-4">
        <div className="px-3 py-1 flex justify-between items-center">
          <CardHeader title="Projects" icon={<Folder size={16} />} />
          {user.role==="admin" ?
          <Button
            variant="filled"
            size="sm"
            icon={<Plus size={16} />}
            onClick={() => {
              setAddProjectModal(true)
            }}
          >
            Add New Project
          </Button> : null}
        </div>
        {fetchingProjects && (
          <div className="w-full flex justify-center items-center">
            fetching projects...
          </div>
        )}
        {!fetchingProjects && projects?.length > 0 ? (
          <Projects projects={projects} />
        ) : (
          <div>no projects</div>
        )}
      </Card>

      {/* Notes */}
      <Card elevation={1}>
        <CardHeader title="Notes" icon={<FileText size={16} />} />
        <div className="bg-[#f2ecf4] rounded-xl p-4">
          <p className="text-[14px] text-[#49454f] leading-6">
            {client.notes || "No notes added."}
          </p>
        </div>
      </Card>
      <Modal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Delete Client"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} disabled={deleting}>
              {deleting ? "Deleting..." : "Delete Client"}
            </Button>
          </>
        }
      >
        <p className="text-[14px] text-[#49454f]">
          Are you sure you want to delete <strong>{client.name}</strong> from{" "}
          {client.company}? This action cannot be undone.
        </p>
      </Modal>
      <ProjectAddModal addProjectModal={addProjectModal} setAddProjectModal={setAddProjectModal} id={id}/>
      
    </div>
  );
}
