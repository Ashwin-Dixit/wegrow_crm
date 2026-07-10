import { useState, useMemo } from 'react'
import { mockClients } from '../data/mockData'
import { useSelector } from 'react-redux'

export function useClients() {
  const {clients, loading, errors} = useSelector((state)=>state.clients)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filteredClients = useMemo(() => {
    return clients?.filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === 'All' || client.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [clients, searchQuery, statusFilter])

  const getClientById = (id) => clients?.find((c) => c.id === id)

  const updateClient = (id, updates) => {
    // setClients((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)))
  }

  return {
    clients,
    filteredClients,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    getClientById,
    updateClient,
  }
}
