import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { useLeads } from '../hooks/useLeads'
import Input, { Select, Textarea } from '../components/ui/Input'
import Button from '../components/ui/Button'
import Card, { CardHeader } from '../components/ui/Card'
import { LEAD_STATUSES, LEAD_SOURCES, INDUSTRIES } from '../data/mockData'
import { mockTeamMembers } from '../data/mockData'

const EMPTY_FORM = {
  name: '', company: '', email: '', phone: '',
  status: 'New', source: 'Website', industry: 'Technology',
  value: '', assignedTo: '', notes: '',
}

export default function AddLeadPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')
  const { addLead, updateLead, getLeadById } = useLeads()

  const existing = editId ? getLeadById(editId) : null
  const [form, setForm] = useState(existing ? {
    name: existing.name, company: existing.company,
    email: existing.email, phone: existing.phone,
    status: existing.status, source: existing.source,
    industry: existing.industry, value: String(existing.value),
    assignedTo: existing.assignedTo, notes: existing.notes,
  } : EMPTY_FORM)

  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.name.trim())    errs.name    = 'Name is required'
    if (!form.company.trim()) errs.company = 'Company is required'
    if (!form.email.trim())   errs.email   = 'Email is required'
    if (!form.value || isNaN(Number(form.value))) errs.value = 'Enter a valid number'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setSaving(true)
    setTimeout(() => {
      const payload = { ...form, value: Number(form.value) }
      if (editId) {
        updateLead(editId, payload)
        navigate(`/leads/${editId}`)
      } else {
        const created = addLead(payload)
        navigate(`/leads/${created.id}`)
      }
    }, 600)
  }

  const statusOpts   = LEAD_STATUSES.map((s) => ({ value: s, label: s }))
  const sourceOpts   = LEAD_SOURCES.map((s)  => ({ value: s, label: s }))
  const industryOpts = INDUSTRIES.map((i)    => ({ value: i, label: i }))
  const assigneeOpts = [
    { value: '', label: 'Unassigned' },
    ...mockTeamMembers.map((m) => ({ value: m.name, label: m.name })),
  ]

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#6750a4] hover:text-[#4f378a] text-[14px] font-medium transition-colors"
        >
          <ArrowLeft size={18} />
          {editId ? 'Back to Lead' : 'Back to Leads'}
        </button>
      </div>

      <div>
        <h2 className="text-[22px] font-semibold text-[#1d1b20]">{editId ? 'Edit Lead' : 'Add New Lead'}</h2>
        <p className="text-[13px] text-[#7a7582] mt-0.5">Fill in the details below to {editId ? 'update the' : 'create a new'} lead.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Info */}
        <Card elevation={1}>
          <CardHeader title="Contact Information" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input id="name"    label="Full Name"    placeholder="Ananya Sharma"           value={form.name}    onChange={set('name')}    error={errors.name}    required />
            <Input id="company" label="Company"      placeholder="TechNova Solutions"       value={form.company} onChange={set('company')} error={errors.company} required />
            <Input id="email"   label="Email"        type="email" placeholder="email@co.in" value={form.email}   onChange={set('email')}   error={errors.email}   required />
            <Input id="phone"   label="Phone Number" placeholder="+91 98765 43210"          value={form.phone}   onChange={set('phone')} />
          </div>
        </Card>

        {/* Lead Details */}
        <Card elevation={1}>
          <CardHeader title="Lead Details" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select id="status"   label="Status"   options={statusOpts}   value={form.status}   onChange={set('status')}   required />
            <Select id="source"   label="Source"   options={sourceOpts}   value={form.source}   onChange={set('source')}   required />
            <Select id="industry" label="Industry" options={industryOpts} value={form.industry} onChange={set('industry')} required />
            <Input
              id="value"
              label="Deal Value (₹)"
              type="number"
              placeholder="500000"
              value={form.value}
              onChange={set('value')}
              error={errors.value}
              required
            />
            <Select
              id="assignedTo"
              label="Assigned To"
              options={assigneeOpts}
              value={form.assignedTo}
              onChange={set('assignedTo')}
              wrapperClassName="sm:col-span-2"
            />
          </div>
        </Card>

        {/* Notes */}
        <Card elevation={1}>
          <CardHeader title="Notes" subtitle="Any relevant context about this lead" />
          <Textarea
            id="notes"
            placeholder="Add any notes about this lead..."
            rows={4}
            value={form.notes}
            onChange={set('notes')}
          />
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3 pb-8">
          <Button variant="ghost" type="button" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button variant="filled" type="submit" icon={<Save size={16} />} disabled={saving}>
            {saving ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </span>
            ) : editId ? 'Update Lead' : 'Create Lead'}
          </Button>
        </div>
      </form>
    </div>
  )
}
