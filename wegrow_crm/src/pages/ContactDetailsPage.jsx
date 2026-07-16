import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Download } from "lucide-react";
import * as XLSX from "xlsx";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import { useSelector } from "react-redux";
import ContactRow from "../components/contacts/ContactRow";

export default function ContactDetailsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("All")
  const {leads} = useSelector((state)=> state.leads)
  const {clients} = useSelector((state)=> state.clients)
  const contactArray = useMemo(() => {
    const arr = [];
    leads.forEach((l) => arr.push({id: l.id, name: l.name, type: "lead", company: l.company, email: l.email, phone: l.phone}));
    clients.forEach((c) => arr.push({id: c.id, name: c.name, type: "client", company: c.company, email: c.email, phone: c.phone}));
    return arr;
  }, [leads, clients]);
  const filteredContacts = useMemo(() => {
      return contactArray.filter((contact) => {
        const matchesSearch =
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.type.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesType = typeFilter === 'All' || contact.type.toLowerCase() === typeFilter.toLowerCase()
        return matchesSearch && matchesType
      })
    }, [contactArray, searchQuery, typeFilter])
    
  const exportContacts = () => {
    const toExport = filteredContacts.map((c) => {
      return {
        Name: c.name,
        Type: c.type,
        Company: c.company,
        Email: c.email,
        Phone: c.phone,
      };
    });
    const worksheet = XLSX.utils.json_to_sheet(toExport);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");

    XLSX.writeFile(workbook, "contacts.xlsx");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-[22px] font-semibold text-[#1d1b20]">
            Contact Details
          </h2>
          <p className="text-[13px] text-[#7a7582] mt-0.5">
            {leads.length} leads and {clients.length} clients
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outlined" size="md" icon={<Download size={16} />}
            onClick={exportContacts}
          >
            Export
          </Button>
        </div>
      </div>

      {/* Search + Filters */}
      <Card elevation={1}>
        <div className="space-y-4">
          <Input
            id="lead-search"
            placeholder="Search by name, type, company, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={16} />}
          />
          <div className="flex gap-2">
          {["All", "Lead", "Client"].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={[
                'px-4 py-1.5 rounded-full text-[12px] font-medium transition-all duration-200',
                typeFilter === t
                  ? 'bg-[#6750a4] text-white shadow-sm'
                  : 'bg-[#e6e0e9] text-[#49454f] hover:bg-[#d8cef0] hover:text-[#4f378a]',
              ].join(' ')}
            >
              {t}
            </button>))}
            </div>
        </div>
      </Card>

      {/* Table */}
      <Card elevation={1} padding="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e6e0e9] bg-[#f2ecf4]">
                {[
                  "Contact",
                  "Type",
                  "Company",
                  "Email",
                  "Phone",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-[11px] font-semibold text-[#7a7582] uppercase tracking-[0.5px] whitespace-nowrap first:rounded-tl-2xl"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact, ind) => (
                  <ContactRow key={ind} contact={contact} />
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-[#e8def9] flex items-center justify-center">
                        <Search size={24} className="text-[#6750a4]" />
                      </div>
                      <p className="text-[15px] font-medium text-[#1d1b20]">
                        No Contacts found
                      </p>
                      <Button
                        variant="tonal"
                        size="sm"
                        onClick={() => {
                          setSearchQuery("");
                          setTypeFilter("All");
                        }}
                      >
                        Clear filters
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {contactArray.length > 0 && (
          <div className="px-4 py-3 border-t border-[#e6e0e9] flex items-center justify-between">
            <p className="text-[12px] text-[#7a7582]">
              Showing {filteredContacts.length} contacts
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
