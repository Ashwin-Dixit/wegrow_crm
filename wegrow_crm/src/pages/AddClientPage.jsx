import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Save, User } from "lucide-react";
import { toast } from "react-hot-toast";
import Input, { Select, Textarea } from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card, { CardHeader } from "../components/ui/Card";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/AuthProvider";
import { useClients } from "@/hooks/useClients";
import { createClientThunk, updateClientThunk } from "@/store/client/clientThunks";

export default function AddClientPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  const { getClientById } = useClients();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { employees } = useSelector((state) => state.employees);

  const existing = editId ? getClientById(editId) : null;
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    status: "",
    industry: "",
    accountManager: "",
    contractValue: "",
    contractStart: "",
    contractEnd: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const nameRef = useRef("");
  const companyRef = useRef("");
  const emailRef = useRef("");
  const phoneRef = useRef("");
  const statusRef = useRef("");
  const industryRef = useRef("");
  const accountManagerRef = useRef("");
  const contractValueRef = useRef("");
  const contractStartRef = useRef("");
  const contractEndRef = useRef("");
  const notesRef = useRef("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const company = companyRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const status = statusRef.current.value;
    const industry = industryRef.current.value;
    const accountManager = accountManagerRef.current.value;
    const contractValue = contractValueRef.current.value;
    const contractStart = contractStartRef.current.value;
    const contractEnd = contractEndRef.current.value;
    const notes = notesRef.current.value;
    setForm({
      name,
      company,
      email,
      phone,
      status,
      industry,
      accountManager,
      contractValue,
      contractStart,
      contractEnd,
      notes,
    });
    setSaving(true);
    if (existing) {
      try {
        const updates = {name, company, industry, email, phone, status,
            accountManager, contractValue, contractStart, contractEnd, notes,
        };
        await dispatch(updateClientThunk({clientId: existing.id, updates})).unwrap()
        console.log("updating ", existing.id, updates);
        toast.success("Client updated successfully");
      } catch (error) {
        toast.error("Failed to update Client");
      }
      setSaving(false);
      return navigate(-1);
    } else {
      try {
        const clientData = {name, company, industry, email, phone,
          status, accountManager, contractValue, contractStart, contractEnd, notes,
        };
        await dispatch(createClientThunk(clientData)).unwrap();
        console.log("adding client ", clientData);
        toast.success("Client added successfully");
      } catch (error) {
        toast.error("Failed to add Client");
      }
    }

    setSaving(false);
    nameRef.current.value = "";
    companyRef.current.value = "";
    emailRef.current.value = "";
    phoneRef.current.value = "";
    statusRef.current.value = "";
    industryRef.current.value = "";
    accountManagerRef.current.value = "";
    contractValueRef.current.value = "";
    contractStartRef.current.value = "";
    contractEndRef.current.value = "";
    notesRef.current.value = "";
  };

  const statusOpts = ["Active", "Inactive", "Renewal Due"].map((s) => ({
    value: s,
    label: s,
  }));
  const employeeOpts = employees.map((emp) => {
    return { value: emp.id, label: `${emp.full_name}, ${emp.employee_id}` };
  });

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#6750a4] hover:text-[#4f378a] text-[14px] font-medium transition-colors"
        >
          <ArrowLeft size={18} />
          {editId ? "Back to Client" : "Back to Clients"}
        </button>
      </div>

      <div>
        <h2 className="text-[22px] font-semibold text-[#1d1b20]">
          {editId ? "Edit Client" : "Add New Client"}
        </h2>
        <p className="text-[13px] text-[#7a7582] mt-0.5">
          Fill in the details below to {editId ? "update the" : "create a new"}{" "}
          client.
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

        {/* client Details */}
        <Card elevation={1}>
          <CardHeader title="Client Details" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              id="status"
              label="Status"
              options={statusOpts}
              ref={statusRef}
              defaultValue={existing?.status}
              required
            />
            <Input
              id="industry"
              label="Industry"
              placeholder="Enter relevent industry"
              ref={industryRef}
              defaultValue={existing?.industry}
              required
            />
            <Select
              id="accountManager"
              label="Account Manager"
              options={employeeOpts}
              ref={accountManagerRef}
              defaultValue={existing?.account_manager}
              required
            />
            <Input
              id="contractValue"
              label="Contract Value"
              type="number"
              placeholder="500000"
              ref={contractValueRef}
              defaultValue={existing?.contractValue}
              required
            />
            <Input
              id="contractStart"
              label="Contract Start"
              type="date"
              ref={contractStartRef}
              defaultValue={existing ? (new Date(existing?.contractStart).toISOString().split("T")[0] || '') : null}
              required
            />
            <Input
              id="contractEnd"
              label="Contract End"
              type="date"
              ref={contractEndRef}
              defaultValue={existing ? (new Date(existing?.contractEnd).toISOString().split("T")[0] || '') : null}
              required
            />
          </div>
        </Card>

        {/* Notes */}
        <Card elevation={1}>
          <CardHeader
            title="Notes"
            subtitle="Any relevant context about this client"
          />
          <Textarea
            id="notes"
            placeholder="Add any notes about this client..."
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
              "Update Client"
            ) : (
              "Create Client"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
