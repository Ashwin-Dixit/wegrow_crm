const supabase = require("../config/supabase");
const { createNotification } = require("../services/notificationServices");

exports.createLead = async (req, res) => {
  const {
    name,
    company,
    industry,
    status,
    email,
    phone,
    notes,
    source,
    assignedTo,
  } = req.body;
  let assigned;
  if (req.user.role === "admin") {
    assigned = assignedTo;
  } else {
    assigned = req.user.employeeId;
  }
  try {
    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .insert({
        name,
        company,
        industry,
        status,
        email,
        phone,
        notes,
        source,
        assigned_to: assigned,
      })
      .select()
      .single();
    if (leadError) {
      console.log("error in creating lead", leadError);
      return res.status(400).json({
        success: false,
        message: `Error in creating lead! ${leadError.message}`,
      });
    }
    let assignedEmployeeName;
    let assignedEmployeeCompanyId;
    if (req.user.role === "admin") {
      const { data: employee, error: employeeError } = await supabase
        .from("employees")
        .select("full_name, employee_id")
        .eq("id", assigned)
        .single();
      assignedEmployeeName = employee.full_name;
      assignedEmployeeCompanyId = employee.employee_id;
    } else {
      assignedEmployeeName = req.user.full_name;
      assignedEmployeeCompanyId = req.user.employeeId;
    }
    const newLead = {
      ...lead,
      assignedTo: assignedEmployeeName,
      employeeId: assignedEmployeeCompanyId,
      createdAt: new Date(lead.created_at),
      updatedAt: new Date(lead.updated_at),
    };
    createNotification({
      title: "Lead Added",
      message: `A new lead from ${company} was assigned to ${assignedEmployeeName} by ${req.user.fullName} ${req.user.role === "admin" ? "(admin)" : ""}`,
      type: "lead",
    });
    return res.status(201).json({
      success: true,
      message: "Lead created successfully",
      lead: newLead,
    });
  } catch (error) {
    console.log("error in creating lead", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
exports.getLeads = async (req, res, next) => {
  let query = supabase.from("leads").select(`*, employees (full_name, employee_id)`);
  if(req.user.role!=="admin"){
    query = query.eq("assigned_to", req.user.employeeId);
  }
  try {
    const { data: leads, error: leadsError } = await query
      .order("created_at", { ascending: false });
    if (leadsError) {
      console.log("error in fetching leads", leadsError);
      return res.status(400).json({
        success: false,
        message: `Error in fetching leads! ${leadsError.message}`,
      });
    }
    const leadsArray = [];
    leads.forEach((lead) => {
      leadsArray.push({
        ...lead,
        assignedTo: lead.employees.full_name,
        employeeId: lead.employees.employee_id,
        createdAt: new Date(lead.created_at),
        updatedAt: new Date(lead.updated_at),
      });
    });
    return res.status(200).json({
      success: true,
      message: "Leads fetched successfully",
      leads: leadsArray,
    });
  } catch (error) {
    console.log("error in fetching leads", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.deleteLeadById = async (req, res, next) => {
  const leadId = req.params.id;
  if (!leadId) {
    return res.status(400).json({
      success: false,
      message: "Lead ID is required",
    });
  }
  try {
    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .select("id")
      .eq("id", leadId)
      .single();

    if (leadError || !lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }
    const { error } = await supabase.from("leads").delete().eq("id", leadId);

    if (error) {
      return res.status(400).json({
        success: false,
        message: `Error in deleting lead! ${error.message}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
      leadId,
    });
  } catch (error) {
    console.log("error in deleting lead", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
exports.updateLeadById = async (req, res, next) => {
  const leadId = req.params.id;
  const updates = req.body;
  try {

    const { data: existingLead, error: leadError } = await supabase
      .from("leads")
      .select("id")
      .eq("id", leadId)
      .single();

    if (leadError || !existingLead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    const { data: lead, error: updateError } = await supabase
      .from("leads")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", leadId)
      .select(`*, employees (full_name, employee_id)`)
      .single();

    if (updateError) {
      return res.status(400).json({
        success: false,
        message: `Error in updating lead! ${updateError.message}`,
      });
    }
    const newLead = {
      ...lead,
      assignedTo: lead.employees.full_name,
      employeeId: lead.employees.employee_id,
      createdAt: new Date(lead.created_at),
      updatedAt: new Date(lead.updated_at),
    };
    return res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      lead: newLead,
    });
  } catch (error) {
    console.log("error in updating lead", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
