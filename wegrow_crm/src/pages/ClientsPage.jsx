import React from "react";
import {useNavigate} from "react-router-dom"
import { Search, Users, Plus, User, } from "lucide-react";
import { useClients } from "../hooks/useClients";
import ClientCard from "../components/clients/ClientCard";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useAuth } from "@/context/AuthProvider";

const CLIENT_STATUSES = ["All", "Active", "Renewal Due", "Inactive"];

export default function ClientsPage() {
  const {
    filteredClients,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
  } = useClients();
  const {user} = useAuth()
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-[22px] font-semibold text-[#1d1b20]">
            Client Accounts
          </h2>
          <p className="text-[13px] text-[#7a7582] mt-0.5">
            {filteredClients.length} clients
          </p>
        </div>
        {user.role==="admin" ?
        <Button
          variant="filled"
          size="md"
          icon={<Plus size={16} />}
          onClick={() => navigate("/clients/new")}
        >
          Add New Client
        </Button>
        : null }
      </div>

      {/* Search + Filters */}
      <Card elevation={1}>
        <div className="space-y-4">
          <Input
            id="client-search"
            placeholder="Search clients by name, company, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={16} />}
          />
          <div>
            <p className="text-[11px] font-semibold text-[#7a7582] uppercase tracking-[0.5px] mb-2">
              Status
            </p>
            <div className="flex flex-wrap gap-1.5">
              {CLIENT_STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={[
                    "px-4 py-1.5 rounded-full text-[12px] font-medium transition-all duration-200",
                    statusFilter === s
                      ? "bg-[#6750a4] text-white shadow-sm"
                      : "bg-[#e6e0e9] text-[#49454f] hover:bg-[#d8cef0] hover:text-[#4f378a]",
                  ].join(" ")}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Client Cards Grid */}
      {filteredClients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredClients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-16 h-16 rounded-full bg-[#e8def9] flex items-center justify-center">
            <Users size={24} className="text-[#6750a4]" />
          </div>
          <p className="text-[15px] font-medium text-[#1d1b20]">
            No clients found
          </p>
          <p className="text-[13px] text-[#7a7582]">
            Try adjusting your search or filters
          </p>
          <Button
            variant="tonal"
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("All");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
