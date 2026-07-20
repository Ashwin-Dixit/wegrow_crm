import { useState, useMemo } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {deleteLeadThunk, updateLeadThunk} from '../store/lead/leadThunks'

export function useLeads() {
  const {leads} = useSelector((state) => state.leads)
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sourceFilter, setSourceFilter] = useState('All')

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === 'All' || lead.status.toLowerCase() === statusFilter.toLowerCase()
      const matchesSource = sourceFilter === 'All' || lead.source.toLowerCase() === sourceFilter.toLowerCase()
      return matchesSearch && matchesStatus && matchesSource
    })
  }, [leads, searchQuery, statusFilter, sourceFilter])

  const getLeadById = (id) => leads.find((l) => l.id === id)

  // const addLead = (newLead) => {
  //   const lead = {
  //     ...newLead,
  //     id: `L${String(leads.length + 1).padStart(3, '0')}`,
  //     createdAt: new Date().toISOString().split('T')[0],
  //     lastContact: new Date().toISOString().split('T')[0],
  //   }
  //   setLeads((prev) => [lead, ...prev])
  //   return lead
  // }

  // const updateLead = (id, updates) => {
  //   setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)))
  // }

  const deleteLead = (id) => {
    dispatch(deleteLeadThunk(id))
  }

  const updateLeadStatus = async (id, status) => {
    await dispatch(updateLeadThunk({leadId: id, updates: {status}}))
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
    // addLead,
    // updateLead,
    deleteLead,
    updateLeadStatus,
  }
}
