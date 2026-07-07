import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Plus, Download } from 'lucide-react'
import { useLeads } from '../hooks/useLeads'
import LeadRow from '../components/leads/LeadRow'
import LeadFilters from '../components/leads/LeadFilters'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'

export default function LeadsPage() {
  const navigate = useNavigate()
  const {
    filteredLeads,
    searchQuery, setSearchQuery,
    statusFilter, setStatusFilter,
    sourceFilter, setSourceFilter,
  } = useLeads()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-[22px] font-semibold text-[#1d1b20]">Leads Pipeline</h2>
          <p className="text-[13px] text-[#7a7582] mt-0.5">{filteredLeads.length} leads found</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outlined" size="md" icon={<Download size={16} />}>
            Export
          </Button>
          <Button variant="filled" size="md" icon={<Plus size={16} />} onClick={() => navigate('/leads/new')}>
            Add Lead
          </Button>
        </div>
      </div>

      {/* Search + Filters */}
      <Card elevation={1}>
        <div className="space-y-4">
          <Input
            id="lead-search"
            placeholder="Search by name, company, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={16} />}
          />
          <LeadFilters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sourceFilter={sourceFilter}
            setSourceFilter={setSourceFilter}
          />
        </div>
      </Card>

      {/* Table */}
      <Card elevation={1} padding="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e6e0e9] bg-[#f2ecf4]">
                {['Lead', 'Status', 'Source', 'Value', 'Assigned To', 'Last Contact', ''].map((h) => (
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
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => <LeadRow key={lead.id} lead={lead} />)
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-[#e8def9] flex items-center justify-center">
                        <Search size={24} className="text-[#6750a4]" />
                      </div>
                      <p className="text-[15px] font-medium text-[#1d1b20]">No leads found</p>
                      <p className="text-[13px] text-[#7a7582]">Try adjusting your search or filters</p>
                      <Button variant="tonal" size="sm" onClick={() => { setSearchQuery(''); setStatusFilter('All'); setSourceFilter('All') }}>
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
        {filteredLeads.length > 0 && (
          <div className="px-4 py-3 border-t border-[#e6e0e9] flex items-center justify-between">
            <p className="text-[12px] text-[#7a7582]">Showing {filteredLeads.length} leads</p>
            <p className="text-[12px] text-[#7a7582]">
              Total value: ₹{filteredLeads.reduce((s, l) => s + l.value, 0).toLocaleString('en-IN')}
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}
