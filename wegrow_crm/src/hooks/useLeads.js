import { useState, useMemo } from 'react'
import {useSelector} from 'react-redux'

export function useLeads() {
  const {leads:leadsArray} = useSelector((state) => state.leads)
  const [leads, setLeads] = useState(leadsArray)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sourceFilter, setSourceFilter] = useState('All')

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter
      const matchesSource = sourceFilter === 'All' || lead.source === sourceFilter
      return matchesSearch && matchesStatus && matchesSource
    })
  }, [leads, searchQuery, statusFilter, sourceFilter])

  const getLeadById = (id) => leads.find((l) => l.id === id)

  const addLead = (newLead) => {
    const lead = {
      ...newLead,
      id: `L${String(leads.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString().split('T')[0],
      lastContact: new Date().toISOString().split('T')[0],
    }
    setLeads((prev) => [lead, ...prev])
    return lead
  }

  const updateLead = (id, updates) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)))
  }

  const deleteLead = (id) => {
    setLeads((prev) => prev.filter((l) => l.id !== id))
  }

  const updateLeadStatus = (id, status) => {
    updateLead(id, { status, lastContact: new Date().toISOString().split('T')[0] })
  }

  return {
    leads,
    filteredLeads,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    sourceFilter,
    setSourceFilter,
    getLeadById,
    addLead,
    updateLead,
    deleteLead,
    updateLeadStatus,
  }
}
