import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import {toast} from "react-hot-toast"
import { useLeads } from "../hooks/useLeads";
import Input, { Select, Textarea } from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card, { CardHeader } from "../components/ui/Card";
import { LEAD_STATUSES, LEAD_SOURCES, INDUSTRIES } from "../data/mockData";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addLeadThunk, updateLeadThunk } from "../store/lead/leadThunks";

const EMPTY_FORM = {
  name: "",
  company: "",
  email: "",
  phone: "",
  status: "New",
  source: "Website",
  industry: "Technology",
  // value: "",
  notes: "",
};

export default function AddLeadPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  const { addLead, updateLead, getLeadById } = useLeads();
  const dispatch = useDispatch()

  const existing = editId ? getLeadById(editId) : null;
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    status: "",
    source: "",
    industry: "",
    // value: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const nameRef = useRef("");
  const companyRef = useRef("");
  const emailRef = useRef("");
  const phoneRef = useRef("");
  const statusRef = useRef("");
  const sourceRef = useRef("");
  const industryRef = useRef("");
  // const valueRef = useRef("");
  const notesRef = useRef("");

  // const validate = () => {
  //   const errs = {};
  //   if (!form.name.trim()) errs.name = "Name is required";
  //   if (!form.company.trim()) errs.company = "Company is required";
  //   if (!form.email.trim()) errs.email = "Email is required";
  //   // if (!form.value || isNaN(Number(form.value)))
  //   //   errs.value = "Enter a valid number";
  //   setErrors(errs);
  //   return Object.keys(errs).length === 0;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const company = companyRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const status = statusRef.current.value;
    const source = sourceRef.current.value;
    const industry = industryRef.current.value;
    // const value = valueRef.current.value;
    const notes = notesRef.current.value;
    setForm({
      name,
      company,
      email,
      phone,
      status,
      source,
      industry,
      // value,
      notes,
    });
    // if (!validate()) return
    setSaving(true);
    if(existing){
      console.log("dispatching update", notes)
      try{
      await dispatch(updateLeadThunk({leadId: existing.id, updates: {name,
      company,
      industry,
      email,
      phone,
      source,
      status,
      notes}})).unwrap()
      toast.success("Lead updated successfully")
      } catch(error){
        toast.error("Failed to update lead")
      }
      setSaving(false)
      return navigate(-1)
    }
    else{
      try{
      await dispatch(addLeadThunk({
      name,
      company,
      industry,
      email,
      phone,
      source,
      status,
      notes,
    })).unwrap();
    toast.success("Lead added successfully")
  } catch(error){
    toast.error("Failed to add lead")
  }
    }
    
    setSaving(false);
    nameRef.current.value = ''
    companyRef.current.value = ''
    emailRef.current.value = ''
    phoneRef.current.value = ''
    statusRef.current.value = ''
    sourceRef.current.value = ''
    industryRef.current.value = ''
    // valueRef.current.value = ''
    notesRef.current.value = ''
  };

  const statusOpts = LEAD_STATUSES.map((s) => ({ value: s, label: s }));
  const sourceOpts = LEAD_SOURCES.map((s) => ({ value: s, label: s }));
  const industryOpts = INDUSTRIES.map((i) => ({ value: i, label: i }));

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#6750a4] hover:text-[#4f378a] text-[14px] font-medium transition-colors"
        >
          <ArrowLeft size={18} />
          {editId ? "Back to Lead" : "Back to Leads"}
        </button>
      </div>

      <div>
        <h2 className="text-[22px] font-semibold text-[#1d1b20]">
          {editId ? "Edit Lead" : "Add New Lead"}
        </h2>
        <p className="text-[13px] text-[#7a7582] mt-0.5">
          Fill in the details below to {editId ? "update the" : "create a new"}{" "}
          lead.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Info */}
        <Card elevation={1}>
          <CardHeader title="Contact Information" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="name"
              label="Full Name"
              placeholder="Ananya Sharma"
              ref={nameRef}
              defaultValue={existing?.name}
              error={errors.name}
              required
            />
            <Input
              id="company"
              label="Company"
              placeholder="TechNova Solutions"
              ref={companyRef}
              defaultValue={existing?.company}
              error={errors.company}
              required
            />
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="email@co.in"
              ref={emailRef}
              defaultValue={existing?.email}
              error={errors.email}
              required
            />
            <Input
              id="phone"
              label="Phone Number"
              placeholder="+91 98765 43210"
              ref={phoneRef}
              defaultValue={existing?.phone}
            />
          </div>
        </Card>

        {/* Lead Details */}
        <Card elevation={1}>
          <CardHeader title="Lead Details" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              id="status"
              label="Status"
              options={statusOpts}
              ref={statusRef}
              defaultValue={existing?.status}
              required
            />
            <Select
              id="source"
              label="Source"
              options={sourceOpts}
              defaultValue={existing?.source}
              ref={sourceRef}
              required
            />
            <Select
              id="industry"
              label="Industry"
              options={industryOpts}
              ref={industryRef}
              defaultValue={existing?.industry}
              required
            />
            {/* <Input
              id="value"
              label="Deal Value (₹)"
              type="number"
              placeholder="500000"
              ref={valueRef}
              error={errors.value}
              defaultValue={existing?.value}
              required
            /> */}
          </div>
        </Card>

        {/* Notes */}
        <Card elevation={1}>
          <CardHeader
            title="Notes"
            subtitle="Any relevant context about this lead"
          />
          <Textarea
            id="notes"
            placeholder="Add any notes about this lead..."
            rows={4}
            ref={notesRef}
            defaultValue={existing?.notes}
          />
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3 pb-8">
          <Button variant="ghost" type="button" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button
            variant="filled"
            type="submit"
            icon={<Save size={16} />}
            disabled={saving}
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </span>
            ) : editId ? (
              "Update Lead"
            ) : (
              "Create Lead"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

