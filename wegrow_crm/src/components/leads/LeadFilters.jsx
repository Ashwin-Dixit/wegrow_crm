import React from 'react'
import { LEAD_STATUSES, LEAD_SOURCES } from '../../data/mockData'

export default function LeadFilters({ statusFilter, setStatusFilter, sourceFilter, setSourceFilter }) {
  const allStatuses = ['All', ...LEAD_STATUSES]
  const allSources  = ['All', ...LEAD_SOURCES]

  return (
    <div className="flex flex-wrap gap-4">
      {/* Status Filter */}
      <div>
        <p className="text-[11px] font-semibold text-[#7a7582] uppercase tracking-[0.5px] mb-2">Status</p>
        <div className="flex flex-wrap gap-1.5">
          {allStatuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={[
                'px-4 py-1.5 rounded-full text-[12px] font-medium transition-all duration-200',
                statusFilter === s
                  ? 'bg-[#6750a4] text-white shadow-sm'
                  : 'bg-[#e6e0e9] text-[#49454f] hover:bg-[#d8cef0] hover:text-[#4f378a]',
              ].join(' ')}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Source Filter */}
      <div>
        <p className="text-[11px] font-semibold text-[#7a7582] uppercase tracking-[0.5px] mb-2">Source</p>
        <div className="flex flex-wrap gap-1.5">
          {allSources.map((s) => (
            <button
              key={s}
              onClick={() => setSourceFilter(s)}
              className={[
                'px-4 py-1.5 rounded-full text-[12px] font-medium transition-all duration-200',
                sourceFilter === s
                  ? 'bg-[#625b71] text-white shadow-sm'
                  : 'bg-[#e6e0e9] text-[#49454f] hover:bg-[#ccc2dc] hover:text-[#625b71]',
              ].join(' ')}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
