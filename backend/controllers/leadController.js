const supabase = require("../config/supabase");

exports.createLead = async (req, res) => {
  const { name, company, email, phone, notes, source } = req.body;
  try {
    const { data: employee, error: employeeError } = await supabase
      .from("employees")
      .select("id, full_name, employee_id")
      .eq("auth_user_id", req.user.id)
      .single();
    if (employeeError) {
      console.log("error in fetching employee ", employeeError);
      return res
        .status(400)
        .json({ success: false, message: `Error in creating lead! ${employeeError.message}` });
    }
    console.log(employee);
    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .insert({
        name,
        company,
        email,
        phone,
        notes,
        source,
        assigned_to: employee.id,
      })
      .select()
      .single();
    if (leadError) {
      console.log("error in creating lead", leadError);
      return res
        .status(400)
        .json({ success: false, message: `Error in creating lead! ${leadError.message}` });
    }

    const newLead = {
      ...lead,
      assignedTo: employee.full_name,
      employeeId: employee.employee_id,
      createdAt: new Date(lead.created_at),
      updatedAt: new Date(lead.updated_at),
    };
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
  try {
    const { data: employee, error: employeeError } = await supabase
      .from("employees")
      .select("id, full_name, employee_id")
      .eq("auth_user_id", req.user.id)
      .single();
    if (employeeError) {
      console.log("error in fetching employee", employeeError);
      return res
        .status(400)
        .json({ success: false, message: "Error in fetching leads!" });
    }
    const { data: leads, error: leadsError } = await supabase
      .from("leads")
      .select("*")
      .eq("assigned_to", employee.id)
      .order("created_at", { ascending: false });
    if (leadsError) {
      console.log("error in fetching leads", leadsError);
      return res
        .status(400)
        .json({ success: false, message: `Error in fetching leads! ${leadsError.message}` });
    }
    const leadsArray = [];
    leads.forEach((lead) => {
      leadsArray.push({
        id: lead.id,
        name: lead.name,
        company: lead.company,
        email: lead.email,
        phone: lead.phone,
        status: lead.status,
        notes: lead.notes,
        source: lead.source,
        assignedTo: employee.full_name,
        employeeId: employee.employee_id,
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
    const { data: employee, error: employeeError } = await supabase
      .from("employees")
      .select("id, full_name, employee_id")
      .eq("auth_user_id", req.user.id)
      .single();
    if (employeeError) {
      console.log("error in fetching employee ", employeeError);
      return res
        .status(400)
        .json({ success: false, message: "Could not update lead try again later!" });
    }
    
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
      .select()
      .single();

    if (updateError) {
      return res.status(400).json({
        success: false,
        message: `Error in updating lead! ${updateError.message}`,
      });
    }
    const newLead = {
      ...lead,
      assignedTo: employee.full_name,
      employeeId: employee.employee_id,
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
